from django.contrib.auth.models import User, Group
from rest_framework import exceptions, generics, mixins, permissions, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import (
    Attribute,
    AttributeValue,
    Basket,
    BasketProduct,
    Category,
    Order,
    Product,
    OrderProduct,
)
from .permissions import IsAdminUserOrReadOnly, IsModeratorUserOrReadOnly, IsEnterepreneurOrReadOnly, DynamicRolePermission, AllowUnauthenticatedReadOnly
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
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsModeratorUserOrReadOnly]
    lookup_field = "slug"
    search_fields = ["name"]

    @action(detail=False, methods=["get"])
    def root(self, request):
        queryset = Category.objects.filter(parent=None)
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def children(self, request, slug=None):
        category = self.get_object()
        queryset = category.children.all()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def products(self, request, slug=None):
        category: Category = self.get_object()
        all_categories = category.get_all_children(include_self=True)
        queryset = Product.objects.filter(category__in=all_categories)
        serializer = ProductViewSerializer(queryset, many=True)

        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def attributes(self, request, slug=None):
        category = self.get_object()
        tree_ids = [parent.id for parent in self.get_all_parents_and_self()]
        queryset = Attribute.objects.filter(category__in=tree_ids)
        serializer = AttributeSerializer(queryset, many=True)

        return Response(serializer.data)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [IsAdminUserOrReadOnly, IsModeratorUserOrReadOnly, IsEnterepreneurOrReadOnly]
    filterset_fields = ["category", "user", "title", "stock", "price"]

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return ProductViewSerializer
        return ProductWriteSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise exceptions.PermissionDenied()

        instance.delete()


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        basket = get_object_or_404(Basket, user=request.user)

        if not basket.basketproduct_set.exists():
            return Response({'error': 'Basket is empty'})

        order = Order.objects.create(user=request.user)
        total_price = 0

        for basket_product in basket.basketproduct_set.all():
            OrderProduct.objects.create(
                order=order,
                product=basket_product.product,
                quantity=basket_product.quantity,
                price=basket_product.product.price * basket_product.quantity
            )
            total_price += basket_product.product.price * basket_product.quantity

        basket.basketproduct_set.all().delete()

        order.total_price = total_price
        order.save()

        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def list(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

### Attribute Views


class AttributeViewSet(viewsets.ModelViewSet):
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer
    permission_classes = [IsModeratorUserOrReadOnly]


class AttributeValueViewSet(viewsets.ModelViewSet):
    queryset = AttributeValue.objects.all()
    serializer_class = AttributeValueSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


### Basket Views


class BasketViewSet(mixins.RetrieveModelMixin,
    viewsets.GenericViewSet):
    serializer_class = BasketSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Basket.objects.filter(user=self.request.user)
    
    def get_object(self):
        return Basket.objects.get(user=self.request.user)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=["post"])
    def add_product(self, request):
        basket = self.get_object()
        product = Product.objects.get(pk=request.data["product"])
        quantity = request.data.get("quantity", 1)

        basket_product, created = BasketProduct.objects.get_or_create(
            basket=basket, product=product
        )
        if not created:
            basket_product.quantity += quantity
            basket_product.save()

        return Response({"status": "ok"})
    
    @action(detail=False, methods=["post"])
    def remove_product(self, request):
        basket = self.get_object()
        product = Product.objects.get(pk=request.data["product"])
        quantity = request.data.get("quantity", 1)

        basket_product = BasketProduct.objects.get(basket=basket, product=product)
        if basket_product.quantity <= quantity:
            basket_product.delete()
        else:
            basket_product.quantity -= quantity
            basket_product.save()

        return Response({"status": "ok"})


class BasketProductViewSet(viewsets.ModelViewSet):
    queryset = BasketProduct.objects.all()
    serializer_class = BasketProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return BasketProduct.objects.filter(basket__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(basket__user=self.request.user)

#  USER VIEWS

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, DynamicRolePermission]  

    @action(detail=True, methods=["post"])
    def create_moderator(self, request, pk=None):
        user = self.get_object()

        if not request.user.groups.filter(name="admin").exists():
            return Response({"error": "Only admin can create moderators."})

        group, created = Group.objects.get_or_create(name="moderator")
        user.groups.add(group)
        return Response({"status": "ok"})

    @action(detail=True, methods=["post"])
    def delete_moderator(self, request, pk=None):
        user = self.get_object()

        if not request.user.groups.filter(name="admin").exists():
            return Response({"error": "Only admin can delete moderators."})

        group = Group.objects.get(name="moderator")
        user.groups.remove(group)
        return Response({"status": "ok"})

    @action(detail=False, methods=["post"])
    def create_user(self, request):
        
        if request.user.groups.filter(name="admin").exists():  
            data = request.data
            user = User.objects.create_user(
                username=data["username"],
                email=data.get("email", ""),
                password=data["password"]
            )
            return Response({"status": "ok"})

        if request.user == request.data["username"]:
            data = request.data
            user = User.objects.create_user(
                username=data["username"],
                email=data.get("email", ""),
                password=data["password"]
            )
            return Response({"status": "ok"})
        
        return Response({"error": "You are not allowed to create this user."})

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

        return Response({"status": "User updated"})

    @action(detail=True, methods=["post"])
    def delete_user(self, request, pk=None):
        user = self.get_object()

        if not request.user.groups.filter(name="admin").exists():
            if request.user != user:
                return Response({"error": "You can only delete your own profile."})
           

        user.delete()
        return Response({"status": "ok"})
    
    @action(detail=True, methods=["post"])
    def approve_category(self, request, pk=None):
        category = self.get_object()
    
        if not request.user.groups.filter(name="moderator").exists():
            return Response({"error": "Only moderators can approve categories."})

        category.is_approved = True
        category.save()
        return Response({"status": "ok"})

