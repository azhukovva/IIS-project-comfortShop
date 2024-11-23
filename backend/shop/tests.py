from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserLoginTest(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='securepassword123'
        )
        
    def test_login_user_success(self):
        url = '/login/'  # URL для логина
        data = {
            'username': 'testuser',
            'password': 'securepassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        
    def test_login_user_invalid_credentials(self):
        url = '/login/'
        data = {
            'username': 'testuser',
            'password': 'wrongpassword123'  # неверный пароль
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_login_user_non_existent(self):
        url = '/login/'
        data = {
            'username': 'nonexistentuser',  # несуществующий пользователь
            'password': 'anypassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
