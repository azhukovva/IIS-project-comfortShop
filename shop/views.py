from django.contrib.auth.models import User
from rest_framework import generics, permissions, viewsets
from rest_framework.filters import OrderingFilter, SearchFilter

from .models import (
    Attribute,
    AttributeValue,
    Basket,
    BasketProduct,
    Category,
    Order,
    Product,
)
from .permissions import IsAdminUserOrReadOnly, IsModeratorUserOrReadOnly, IsAuthenticatedOrReadOnly
from .serializers import (
    AttributeSerializer,
    AttributeValueSerializer,
    BasketSerializer,
    CategorySerializer,
    OrderSerializer,
    ProductSerializer,
    UserSerializer,
    BasketProductSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsModeratorUserOrReadOnly]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsModeratorUserOrReadOnly] 

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 

### Attribute Views and Baskets

class AttributeViewSet(viewsets.ModelViewSet):
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer
    permission_classes = [IsModeratorUserOrReadOnly]

class AttributeValueViewSet(viewsets.ModelViewSet):
    queryset = AttributeValue.objects.all()
    serializer_class = AttributeValueSerializer
    permission_classes = [IsModeratorUserOrReadOnly]

class BasketViewSet(viewsets.ModelViewSet):
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 

    def get_queryset(self):
        return Basket.objects.filter(user=self.request.user)

class BasketProductViewSet(viewsets.ModelViewSet):
    queryset = BasketProduct.objects.all()
    serializer_class = BasketProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return BasketProduct.objects.filter(basket__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(basket__user=self.request.user)                  