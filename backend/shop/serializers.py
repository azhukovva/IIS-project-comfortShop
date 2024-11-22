from django.contrib.auth.models import User
from rest_framework import serializers

from .models import (
    Attribute,
    AttributeValue,
    Basket,
    BasketProduct,
    Category,
    Order,
    OrderProduct,
    Product,
)



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    parent = serializers.SerializerMethodField()
    children = serializers.SerializerMethodField()
    image = serializers.ImageField(required=False, allow_null=True)

    def get_children(self, obj):
        return CategorySerializer(obj.children.all(), many=True).data

    def get_parent(self, obj):
        return obj.parent.slug if obj.parent else None
    

    class Meta:
        model = Category
        fields = ["slug", "name", "parent", "children", "image"]
        read_only_fields = ["children"]

        extra_kwargs = {"url": {"lookup_field": "slug"}}
        lookup_field = "slug"

        depth = 1  # TODO: Check if this is needed


class AttributeSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        queryset=Category.objects.all(),
        slug_field="slug",
    )

    class Meta:
        model = Attribute
        fields = ["id", "name", "category"]


class AttributeValueSerializer(serializers.ModelSerializer):
    attribute = serializers.PrimaryKeyRelatedField(queryset=Attribute.objects.all())
    products = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), many=True)

    class Meta:
        model = AttributeValue
        fields = ["id", "value", "attribute", "products"]


class ProductViewSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        queryset=Category.objects.all(),
        slug_field="slug",
    )  # Show the category in the product
    user = UserSerializer(read_only=True)
    attribute_values = AttributeValueSerializer(many=True, source="attributevalue_set")
    image = serializers.ImageField(read_only=True, allow_null=True)

    class Meta:
        model = Product
        fields = ["id", "title", "description", "price", "category", "user", "stock", "attribute_values", "image"]


class ProductWriteSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        queryset=Category.objects.all(),
        slug_field="slug",
    )  # Show the category in the product
    user = UserSerializer(read_only=True)
    attribute_values = serializers.ListField(
        child=serializers.DictField(child=serializers.CharField()), write_only=True, required=False
    )
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Product
        fields = ["id", "title", "description", "price", "category", "user", "stock", "attribute_values", "image"]

    def validate_attribute_values(self, attribute_values):
        category_slug = self.initial_data.get("category", None)
        if not category_slug:
            raise serializers.ValidationError("Category is required to validate attribute values.")

        try:
            category_instance = Category.objects.get(slug=category_slug)
        except Category.DoesNotExist:
            raise serializers.ValidationError("Category does not exist.")

        # Get all parent categories and self
        all_categories = category_instance.get_all_parents_and_self()

        # Get all valid attributes for the category and its parents
        valid_attributes = Attribute.objects.filter(category__in=all_categories)

        for attribute_value in attribute_values:
            attribute_id = attribute_value.get("attribute")
            if not attribute_id:
                raise serializers.ValidationError("Each attribute value must contain an 'attribute' key.")

            try:
                attribute = valid_attributes.get(id=attribute_id)
            except Attribute.DoesNotExist:
                raise serializers.ValidationError(
                    f"Attribute with id {attribute_id} does not belong to the category {category_instance.name} or its parent categories, or does not exist."
                )

        return attribute_values

    def create(self, validated_data):
        attribute_values = validated_data.pop("attribute_values", {})
        product = Product.objects.create(**validated_data)

        for attribute_value in attribute_values:
            selected_attribute_value, created = AttributeValue.objects.get_or_create(
                value=attribute_value["value"], attribute_id=attribute_value["attribute"]
            )
            selected_attribute_value.products.add(product)

        return product

    def update(self, instance, validated_data):
        attribute_values = validated_data.pop("attribute_values", [])
        instance = super().update(instance, validated_data)

        # Clear existing attribute values
        instance.attributevalue_set.clear()

        # Add new attribute values
        for attribute_value in attribute_values:
            attribute = attribute_value["attribute"]
            value = attribute_value["value"]
            attribute_value_instance, created = AttributeValue.objects.get_or_create(
                value=value, attribute_id=attribute
            )
            attribute_value_instance.products.add(instance)

        return instance


# OrderProduct Serializer
class OrderProductSerializer(serializers.ModelSerializer):
    product = ProductViewSerializer(read_only=True)

    class Meta:
        model = OrderProduct
        fields = ["id", "product", "quantity", "price"]


# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    products = OrderProductSerializer(source="orderproduct_set", many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "user", "products", "created_at", "updated_at"]


# BasketProduct Serializer
class BasketProductSerializer(serializers.ModelSerializer):
    product = ProductViewSerializer(read_only=True)

    class Meta:
        model = BasketProduct
        fields = ["id", "product", "quantity"]


# Basket Serializer
class BasketSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    products = BasketProductSerializer(source="basketproduct_set", many=True, read_only=True)

    class Meta:
        model = Basket
        fields = ["user", "products"]