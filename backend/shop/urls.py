from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views

from .views import (
    AttributeValueViewSet,
    AttributeViewSet,
    BasketProductViewSet,
    BasketViewSet,
    CategoryViewSet,
    OrderViewSet,
    ProductViewSet,
    UserViewSet,
)

router = routers.DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"products", ProductViewSet, basename="product")
router.register(r"orders", OrderViewSet, basename="order")
router.register(r"attributes", AttributeViewSet, basename="attribute")
router.register(r"attribute-values", AttributeValueViewSet, basename="attribute-value")
router.register(r"baskets", BasketViewSet, basename="basket")
router.register(r"basket-products", BasketProductViewSet, basename="basket-product")
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path("", include(router.urls)),
    # USER AUTHENTICATION
    path("login/", views.obtain_auth_token),
]
