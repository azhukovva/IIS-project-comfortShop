from django.contrib.auth.models import User
from django.test import TestCase
from shop.models import Product, Category, Basket, BasketProduct
 

class ProductModelTest(TestCase):
    
    def setUp(self):
        # Создаем пользователя для связи с продуктами
        self.user = User.objects.create_user(username="testuser", password="password123", email="k")
        
        # Создаем категорию для связи с продуктами
        self.category = Category.objects.create(name="Electronics", slug="electronics", is_approved=True)
        
    def test_create_product(self):
        # Тестируем создание продукта
        product = Product.objects.create(
            title="Test Product",
            description="A great product",
            price=100.00,
            category=self.category,
            user=self.user,
            stock=10,
            is_approved=True
        )
        
        # Проверка, что продукт создан
        self.assertEqual(product.title, "Test Product")
        self.assertEqual(product.description, "A great product")
        self.assertEqual(product.price, 100.00)
        self.assertEqual(product.category, self.category)
        self.assertEqual(product.user, self.user)
        self.assertEqual(product.stock, 10)
        self.assertTrue(product.is_approved)

    def test_product_is_approved(self):
        # Проверка значений поля is_approved
        product_approved = Product.objects.create(
            title="Approved Product",
            description="An approved product",
            price=200.00,
            category=self.category,
            user=self.user,
            stock=5,
            is_approved=True
        )
        product_not_approved = Product.objects.create(
            title="Not Approved Product",
            description="A non-approved product",
            price=50.00,
            category=self.category,
            user=self.user,
            stock=0,
            is_approved=False
        )
        
        self.assertTrue(product_approved.is_approved)
        self.assertFalse(product_not_approved.is_approved)
    
    def test_product_stock(self):
        # Проверка корректности поля stock
        product = Product.objects.create(
            title="Stocked Product",
            description="A stocked product",
            price=150.00,
            category=self.category,
            user=self.user,
            stock=20
        )
        self.assertEqual(product.stock, 20)
    
    def test_product_str_method(self):
        # Проверка метода __str__
        product = Product.objects.create(
            title="Product with str method",
            description="This should return the product's title",
            price=300.00,
            category=self.category,
            user=self.user,
            stock=15
        )
        self.assertEqual(str(product), "Product with str method")
