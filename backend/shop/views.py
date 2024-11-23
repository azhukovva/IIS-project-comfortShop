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
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
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
    Post,
    ProposedCategory,
    ProposedProduct,
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
    UserSerializer,
    RatingSerializer,
    PostSerializer,
    RegisterSerializer,
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly, IsModeratorOrReadOnly]
    lookup_field = "slug"
    search_fields = ["name"]

    @action(detail=False, methods=["get"], permission_classes=[AllowAny])
    def root(self, request):
        queryset = Category.objects.filter(parent=None)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"], permission_classes=[AllowAny])
    def children(self, request, slug=None):
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
        tree_ids = category.get_all_parents_and_self().values_list("id", flat=True)
        queryset = Attribute.objects.filter(category__in=tree_ids)
        serializer = AttributeSerializer(queryset, many=True)
        return Response(serializer.data)


class ProposedCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProposedCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [IsEnterepreneurOrReadOnly, IsAdminOrReadOnly, IsModeratorOrReadOnly]
    filterset_fields = ["category", "user", "title", "stock", "price"]

    def get_queryset(self):
        queryset = Product.objects.all()
        if not self.request.user.groups.filter(name__in=["moderator", "admin"]).exists():
            queryset = queryset.filter(is_approved=True)
        return queryset

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return ProductViewSerializer
        return ProductWriteSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise exceptions.PermissionDenied("You cannot delete this product.")
        instance.delete()


class ProposedProductViewSet(viewsets.ModelViewSet):
    queryset = ProposedProduct.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ProductWriteSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)    


class ProductManagementViewSet(viewsets.ModelViewSet):
    serializer_class = ProductWriteSerializer
    permission_classes = [IsAdminOrModerator]

    def get_queryset(self):
        if self.request.method in permissions.SAFE_METHODS:
            return ProposedProduct.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        product = self.get_object()
        if product.is_approved:
            raise exceptions.PermissionDenied("Cannot modify approved products.")
        serializer.save()            

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        basket = get_object_or_404(Basket, user=request.user)
        if not basket.basketproduct_set.exists():
            return Response({"error": "Basket is empty"}, status=400)

        with transaction.atomic():
            order = Order.objects.create(user=request.user)
            total_price = 0

            for basket_product in basket.basketproduct_set.select_related("product").all():
                OrderProduct.objects.create(
                    order=order,
                    product=basket_product.product,
                    quantity=basket_product.quantity,
                    price=basket_product.product.price * basket_product.quantity,
                )
                total_price += basket_product.product.price * basket_product.quantity

            order.total_price = total_price
            order.save()

            basket.basketproduct_set.all().delete()

        serializer = self.get_serializer(order)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        orders = self.queryset.filter(user=request.user)
        serializer = self.get_serializer(orders, many=True)
        return Response(serializer.data)


### Attribute Views


class AttributeViewSet(viewsets.ModelViewSet):
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer
    permission_classes = [IsAdminOrReadOnly, IsModeratorOrReadOnly]


class AttributeValueViewSet(viewsets.ModelViewSet):
    queryset = AttributeValue.objects.all()
    serializer_class = AttributeValueSerializer
    permission_classes = [IsModeratorOrReadOnly, IsAdminOrReadOnly]


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

    @action(detail=False, methods=["post"])
    def add_product(self, request):
        basket = self.get_object()
        product = get_object_or_404(Product, pk=request.data.get("product"))
        quantity = int(request.data.get("quantity", 1))

        if product.stock < quantity:
            return Response({"error": "Not enough stock available"}, status=400)

        basket_product, created = BasketProduct.objects.get_or_create(
            basket=basket, product=product
        )
        if not created:
            basket_product.quantity += quantity
        basket_product.save()

        return Response({"status": "Product added to basket"})

    @action(detail=False, methods=["post"])
    def remove_product(self, request):
        basket = self.get_object()
        product = get_object_or_404(Product, pk=request.data.get("product"))
        quantity = int(request.data.get("quantity", 1))

        try:
            basket_product = BasketProduct.objects.get(basket=basket, product=product)
            if basket_product.quantity <= quantity:
                basket_product.delete()
            else:
                basket_product.quantity -= quantity
                basket_product.save()
        except BasketProduct.DoesNotExist:
            return Response({"error": "Product not in basket"}, status=400)

        return Response({"status": "Product removed from basket"})



class BasketProductViewSet(viewsets.ModelViewSet):
    queryset = BasketProduct.objects.all()
    serializer_class = BasketProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            if self.request.method in permissions.SAFE_METHODS: 
                return BasketProduct.objects.filter(basket__user=self.request.user)
        return BasketProduct.objects.none()

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise PermissionDenied("You must be authenticated to add products to basket.")
        serializer.save(basket__user=self.request.user)

# Review Views
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

    def perform_create(self, serializer):
        user = self.request.user
        post = serializer.validated_data['post']
        if Rating.objects.filter(user=user, post=post).exists():
            return Response("You have already rated this post.")
        serializer.save(user=user) 


#  USER VIEWS

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrModerator]

    @action(detail=False, methods=["post"], permission_classes=[IsAdminOrModerator])
    def create_user(self, request):
        data = request.data
        user = User.objects.create_user(
            username=data["username"],
            email=data.get("email", ""),
            password=data["password"],
        )
        return Response({"status": "User created successfully"})

    @action(detail=True, methods=["delete"], permission_classes=[IsAdminOrModerator])
    def delete_user(self, request, pk=None):
        user = self.get_object()
        user.delete()
        return Response({"status": "User deleted successfully"})

    @action(detail=True, methods=["post"], permission_classes=[IsAdminOrModerator])
    def approve_category(self, request, pk=None):
        category = get_object_or_404(ProposedCategory, pk=pk)
        category.is_approved = True
        category.save()
        return Response({"status": "Category approved"})

    @action(detail=True, methods=["post"], permission_classes=[IsAdminOrModerator])
    def approve_product(self, request, pk=None):
        product = get_object_or_404(ProposedProduct, pk=pk)
        product.is_approved = True
        product.save()
        return Response({"status": "Product approved"})
""""
    @action(detail=True, methods=["patch"])
    def update_user(self, request, pk=None):
        user = self.get_object()
        if not request.user.groups.filter(name="admin").exists():  
            if request.user != user:
                return Response({"error": "You can only update your own profile."})
        
        if "username" in request.data:
            user.username = request.data["username"]
        if "email" in request.data:
            user.email = request.data["email"]
        if "first_name" in request.data:
            user.first_name = request.data["first_name"]
        if "last_name" in request.data:
            user.last_name = request.data["last_name"]

        user.save()

        return Response({"status": "User updated"})"""

class RegisterView(APIView):
    permission_classes = [AllowAny]
    @swagger_auto_schema(
        request_body=RegisterSerializer,
        responses={
            201: openapi.Response("User registered successfully"),
            400: "Validation Error"
        },
    )

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save() 

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                'message': 'User created successfully',
                'token': access_token,  
                'refresh token': str(refresh)  
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""   
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]  

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'Access granted'}, status=status.HTTP_200_OK)      
"""

@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'group_name': openapi.Schema(type=openapi.TYPE_STRING, description='Name of the group'),
            'user_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID of the user'),
        },
        required=['group_name', 'user_id'],
    ),
    responses={
        200: openapi.Response('Success', openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'status': openapi.Schema(type=openapi.TYPE_STRING, description='Success message')
            }
        )),
        400: openapi.Response('Error', openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING, description='Error message')
            }
        )),
    }
)
@api_view(["POST"])
@permission_classes([IsAdminOrReadOnly])
def add_user_to_group(request):
    group_name = request.data.get("group_name")
    user_id = request.data.get("user_id")

    try:
        group = Group.objects.get(name=group_name)
        user = User.objects.get(id=user_id)
        user.groups.add(group)
        return Response({"status": "User added to group"}, status=200)
    except Group.DoesNotExist:
        return Response({"error": "Group not found"}, status=400)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=400)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_info_from_jwt(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "groups": [group.name for group in user.groups.all()],
    })    


@api_view(['GET'])
def get_user_by_id(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
@swagger_auto_schema(
    method="get",
    manual_parameters=[
        openapi.Parameter(
            "username",
            openapi.IN_PATH,
            description="Username of the user to retrieve",
            type=openapi.TYPE_STRING,
            required=True,
        )
    ],
    responses={
        200: UserSerializer,
        404: openapi.Response(
            description="User not found",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "error": openapi.Schema(type=openapi.TYPE_STRING)
                }
            ),
        ),
    },
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_by_username(request, username):

    try:
        user = User.objects.get(username=username)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)