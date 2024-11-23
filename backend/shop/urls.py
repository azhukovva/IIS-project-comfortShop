from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views

from .views import (
    AttributeViewSet,
    BasketViewSet,
    CategoryViewSet,
    OrderViewSet,
    ProductViewSet,
    UserViewSet,
    RatingViewSet,
    RegisterView,
    ProposedCategoryViewSet,
    add_product_to_basket,
    remove_product_from_basket,
)

router = routers.DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"products", ProductViewSet, basename="product")
router.register(r"orders", OrderViewSet, basename="order")
router.register(r"attributes", AttributeViewSet, basename="attribute")
router.register(r"baskets", BasketViewSet, basename="basket")
router.register(r'users', UserViewSet, basename='user')
router.register(r"rating", RatingViewSet, basename="rating")
router.register(r"proposed_categories", ProposedCategoryViewSet, basename="proposed_category")

urlpatterns = [
    path("", include(router.urls)),
    # USER AUTHENTICATION
    path("login/", views.obtain_auth_token),
    path("register/", RegisterView.as_view(), name="register"),
    # BASKET
    path("baskets/add_product", add_product_to_basket, name="add_product_to_basket"),
    path("baskets/remove_product", remove_product_from_basket, name="remove_product_from_basket"),
]
