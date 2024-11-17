from django.contrib.auth.models import User
from rest_framework import exceptions, generics, mixins, permissions, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .models import (
    Attribute,
    AttributeValue,
    Basket,
    BasketProduct,
    Category,
    Order,
    Product,
)
from .permissions import IsAdminUserOrReadOnly, IsModeratorUserOrReadOnly
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
    permission_classes = [IsAuthenticatedOrReadOnly]
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


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


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
