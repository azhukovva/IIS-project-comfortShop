from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# MAIN MODELS


class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    parent = models.ForeignKey(
        "self",
        related_name="children",
        on_delete=models.CASCADE,
        blank=True,
        null=True,  
    )
    image = models.ImageField(upload_to="category_images/", blank=True, null=True)

    def __str__(self):
        return self.name

    def get_all_parents_and_self(self) -> list["Category"]:
        parents = [self]
        parent = self.parent
        while parent is not None:
            parents.append(parent)
            parent = parent.parent

        return parents

    def get_all_children(self, include_self=False) -> list["Category"]:
        children = list(self.children.all())
        for child in children:
            children.extend(child.get_all_children())

        if include_self:
            children.append(self)

        return children


class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, related_name="products", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="products", on_delete=models.CASCADE)
    stock = models.PositiveIntegerField()
    image = models.ImageField(upload_to="products/", blank=True, null=True)

    def __str__(self):
        return self.title


# ATTRIBUTE MODELS


class Attribute(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, related_name="attributes", on_delete=models.CASCADE)

    class Meta:
        unique_together = ["name", "category"]

    def __str__(self):
        return self.name


class AttributeValue(models.Model):
    value = models.CharField(max_length=200)
    attribute = models.ForeignKey(Attribute, related_name="values", on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)

    class Meta:
        unique_together = ["value", "attribute"]

    def __str__(self):
        return self.value


# ORDER MODELS


class Order(models.Model):
    user = models.ForeignKey(User, related_name="orders", on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through="OrderProduct")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id}"


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.title} x {self.quantity}"


class Basket(models.Model):
    user = models.ForeignKey(User, related_name="basket", on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through="BasketProduct")

    def __str__(self):
        return f"Basket {self.id}"


class BasketProduct(models.Model):
    basket = models.ForeignKey(Basket, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.product.title} x {self.quantity}"


# OTHER MODELS


class Review(models.Model):
    pass


# SIGNALS


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_basket(sender, instance=None, created=False, **kwargs):
    if created:
        Basket.objects.create(user=instance)
