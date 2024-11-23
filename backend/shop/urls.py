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
    RatingViewSet,
    PostViewSet,
    RegisterView,
    user_info_from_jwt,
    get_user_by_id,
    #LoginView,
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
router.register(r"rating", RatingViewSet, basename="rating")
router.register(r'posts', PostViewSet, basename='post')



urlpatterns = [
    path("", include(router.urls)),
    # USER AUTHENTICATION
    path("login/", views.obtain_auth_token),
    path('token/user/', user_info_from_jwt, name='user_info_from_jwt'),
    path('api/users/<int:user_id>/', get_user_by_id, name='get_user_by_id')
    
]
