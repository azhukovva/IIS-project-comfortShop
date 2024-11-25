from django.contrib.auth.models import User, Group, AnonymousUser
from rest_framework import exceptions, generics, mixins, permissions, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction
from rest_framework.decorators import permission_classes
from rest_framework import status
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.authtoken.views import obtain_auth_token

from .models import (
    Attribute,
    AttributeValue,
    Basket,
    BasketProduct,
    Category,
    Order,
    Product,
    OrderProduct,
    Rating,
    ProposedCategory,
)
from .permissions import IsAdminOrReadOnly, IsModeratorOrReadOnly,  IsAdminOrModerator, IsEnterepreneurOrReadOnly
from .serializers import (
    AttributeSerializer,
    AttributeValueSerializer,
    BasketProductSerializer,
    BasketSerializer,
    CategorySerializer,
    OrderSerializer,
    ProductViewSerializer,
    ProductWriteSerializer,
    ProposedCategorySerializer,
    UserSerializer,
    RatingSerializer,
    RegisterSerializer,
)

# Category Views
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly|IsModeratorOrReadOnly]
    lookup_field = "slug"
    search_fields = ["name"]

    @action(detail=False, methods=["get"], permission_classes=[AllowAny]) # detail=False means that this action is for the list of objects
    def root(self, request):
        queryset = Category.objects.filter(parent=None)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"], permission_classes=[AllowAny])
    def children(self, request, slug=None): # detail=True means that this action is for a single object 
        category = self.get_object()
        queryset = category.children.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"], permission_classes=[AllowAny]) 
    def products(self, request, slug=None):
        category: Category = self.get_object()
        all_categories = category.get_all_children(include_self=True)
        queryset = Product.objects.filter(category__in=all_categories)
        serializer = ProductViewSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"], permission_classes=[AllowAny]) 
    def attributes(self, request, slug=None):
        category = self.get_object()
        tree_ids = category.get_all_parents_and_self().values_list("id", flat=True) # Get all parents and self
        queryset = Attribute.objects.filter(category__in=tree_ids)
        serializer = AttributeSerializer(queryset, many=True)
        return Response(serializer.data)

# Proposed Category Views
class ProposedCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProposedCategory.objects.all()
    serializer_class = ProposedCategorySerializer
    permission_classes = [IsAuthenticated] 

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


    @action(detail=True, methods=["post"], permission_classes=[IsAdminOrModerator]) # category approve action
    def approve(self, request, pk=None):
        try:
            proposed_category = ProposedCategory.objects.get(id=pk)
            category = Category.objects.create(name=proposed_category.name, slug=proposed_category.slug, parent=proposed_category.parent, image=proposed_category.image) 
            proposed_category.delete()

            return Response(
                {"status": "Category approved", "category_id": category.slug},
                status=status.HTTP_201_CREATED,
            )

        except ProposedCategory.DoesNotExist:
            return Response(
                {"error": "Proposed category not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": f"Something went wrong: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )


# Product Views
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [IsEnterepreneurOrReadOnly| IsAdminOrModerator]
    filterset_fields = ["category", "user", "title", "stock", "price"]

    def get_serializer_class(self):     # get_serializer_class method is used to determine which serializer to use based on the request method
        if self.request.method in permissions.SAFE_METHODS:   
            return ProductViewSerializer
        return ProductWriteSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise exceptions.PermissionDenied("You cannot delete this product.")
        instance.delete()

# Order Views
class OrderViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):  # get_queryset method is used to determine which objects to return based on the request
        queryset = Order.objects.all()
        if not self.request.user.groups.filter(name__in=["moderator", "admin"]).exists():
            queryset = queryset.filter(user=self.request.user)
        return queryset
    
    def create(self, request, *args, **kwargs): # create method is used to create a new object
        
        basket = Basket.objects.get(user=request.user)
        if not basket.products.exists():
            return Response({"error": "Basket is empty"}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(user=request.user,address=request.data.get('address'), city=request.data.get('city'), zip_code=request.data.get('zip_code'), total_price=0)
        order.total_price = order.c_total_price  
        order.save()  

        with transaction.atomic(): # transaction.atomic() is used to ensure that all operations are performed successfully
            for basket_product in BasketProduct.objects.filter(basket=basket):
                
                product = basket_product.product
                if product.stock >= basket_product.quantity:
                    product.stock -= basket_product.quantity  # Reduce the stock of the product
                    product.save()  # Save the product

                    OrderProduct.objects.create(
                        order=Order.objects.get(id=order.id),
                        product=basket_product.product,
                        quantity=basket_product.quantity,
                        price=basket_product.product.price
                    )
                else:
                    return Response({"error": "Not enough stock"}, status=status.HTTP_400_BAD_REQUEST)    

            BasketProduct.objects.filter(basket=basket).delete()


        order.save()    
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



### Attribute Views


class AttributeViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer
    permission_classes = [IsAdminOrReadOnly|IsModeratorOrReadOnly]


### Basket Views


class BasketViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = BasketSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Basket.objects.filter(user=user)
        else:
            return Basket.objects.none()

    def get_object(self):
        basket, created = Basket.objects.get_or_create(user=self.request.user)
        return basket

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)



# add product to basket view
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_product_to_basket(request):
    user = request.user
    product_id = request.data.get("product_id")
    quantity = request.data.get("quantity", 1)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    basket, created = Basket.objects.get_or_create(user=user)
    basket_product, created = BasketProduct.objects.get_or_create(
        basket=basket, product=product, quantity=0
    )
    basket_product.quantity += quantity
    basket_product.save()

    return Response({"status": "Product added to basket"})


# remove product from basket view
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def remove_product_from_basket(request):
    user = request.user
    product_id = request.data.get("product_id")
    quantity = request.data.get("quantity", 1)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    try:
        basket = Basket.objects.get(user=user)
    except Basket.DoesNotExist:
        return Response({"error": "Basket not found"}, status=404)

    try:
        basket_product = BasketProduct.objects.get(basket=basket, product=product)
        if basket_product.quantity <= quantity:
            basket_product.delete()
        else:
            basket_product.quantity -= quantity
            basket_product.save()
    except BasketProduct.DoesNotExist:
        return Response({"error": "Product not in basket"}, status=404)

    return Response({"status": "Product removed from basket"})


# Review Views
class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer 


#  USER VIEWS


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrModerator]

    def get_queryset(self):  # get_queryset method is used to determine which objects to return based on the request
        queryset = User.objects.all()
        if not self.request.user.groups.filter(name__in=["moderator", "admin"]).exists() and not self.request.method in permissions.SAFE_METHODS:
            queryset = queryset.filter(id=self.request.user.id)
        return queryset
    
    @action(detail=True, methods=["post"], permission_classes=[IsAdminOrReadOnly])
    def promote_to_moderator(self, request, pk=None):   # promote_to_moderator action
        user = self.get_object()
        group, created = Group.objects.get_or_create(name="moderator")
        user.groups.add(group)
        return Response({"status": "User promoted to moderator"})
    
    @action(detail=True, methods=["post"], permission_classes=[IsAdminOrModerator])
    def promote_to_entrepreneur(self, request, pk=None): # promote_to_entrepreneur action
        user = self.get_object()
        group, created = Group.objects.get_or_create(name="entrepreneur")
        user.groups.add(group)
        return Response({"status": "User promoted to entrepreneur"})

    
    @action(detail=False, methods=["get", "put"], permission_classes=[IsAuthenticated])
    def me(self, request): # action for the current user to get or update their profile
        user = request.user
        if request.method == "PUT":
            serializer = self.get_serializer(user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    

# Register View
class RegisterView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(   # swagger_auto_schema is used to generate the documentation for the endpoint
        request_body=RegisterSerializer,
        responses={
            201: openapi.Response("User registered successfully"),
            400: "Validation Error"
        },
    )
    def post(self, request): # post method is used to create a new object
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save() 

        return Response({
            'message': 'User created successfully',
            'token': user.auth_token.key  
        }, status=status.HTTP_201_CREATED)
        