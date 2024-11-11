from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Category,
    Product,
    Attribute,
    AttributeValue,
    ProductAttributeValue,
    Order,
    OrderProduct,
    Basket,
    BasketProduct,
)

# Serialisers are needed to convert data from/to JSON format.

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)  # Show the category in the product
    user = UserSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'category', 'user', 'available', 'stock']

class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ['id', 'name', 'category']


# AttributeValue Serializer
class AttributeValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttributeValue
        fields = ['id', 'value', 'attribute']


# ProductAttributeValue Serializer
class ProductAttributeValueSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    attribute = AttributeSerializer(read_only=True)
    value = AttributeValueSerializer(read_only=True)

    class Meta:
        model = ProductAttributeValue
        fields = ['id', 'product', 'attribute', 'value']


# OrderProduct Serializer
class OrderProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderProduct
        fields = ['id', 'product', 'quantity', 'price']


# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    products = OrderProductSerializer(source='orderproduct_set', many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'products', 'created_at', 'updated_at']


# BasketProduct Serializer
class BasketProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = BasketProduct
        fields = ['id', 'product', 'quantity']


# Basket Serializer
class BasketSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    products = BasketProductSerializer(source='basketproduct_set', many=True, read_only=True)

    class Meta:
        model = Basket
        fields = ['id', 'user', 'products'] 
