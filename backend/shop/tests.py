from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

class UserRegistrationTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('register')  # URL для регистрации

    def test_register_user_success(self):
        data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password123",
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_user_with_existing_email(self):
        # Создадим пользователя с таким же email
        User.objects.create_user(username="user1", email="test@example.com", password="password123")
        data = {
            "username": "newuser",
            "email": "test@example.com",  # Такой email уже существует
            "password": "password123",
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_user_with_existing_username(self):
        # Создадим пользователя с таким же username
        User.objects.create_user(username="existinguser", email="existinguser@example.com", password="password123")
        data = {
            "username": "existinguser",  # Такой username уже существует
            "email": "newuser@example.com",
            "password": "password123",
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)