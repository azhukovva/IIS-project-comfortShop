from django.contrib.auth.models import User, Group
from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from rest_framework import status


class CategoryPermissionTests(TestCase):
    def setUp(self):
        # Ensure no duplicates by using get_or_create
        self.admin_group, _ = Group.objects.get_or_create(name="admin")
        self.moderator_group, _ = Group.objects.get_or_create(name="moderator")

        # Create users and assign groups
        self.admin_user = User.objects.create_user(username="admin", password="admin123")
        self.admin_user.groups.add(self.admin_group)
        
        self.moderator_user = User.objects.create_user(username="moderator", password="moderator123")
        self.moderator_user.groups.add(self.moderator_group)
        
        self.regular_user = User.objects.create_user(username="user", password="user123")
    
    def test_admin_can_create_category(self):
        # Log in as admin user
        self.client.login(username="admin", password="admin123")
        
        # Create category
        data = {"name": "New Category", "slug": "new-category"}
        response = self.client.post("/api/categories/", data)
        
        # Assert category creation success
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_moderator_can_create_category(self):
        # Log in as moderator user
        self.client.login(username="moderator", password="moderator123")
        
        # Create category
        data = {"name": "New Category", "slug": "new-category"}
        response = self.client.post("/api/categories/", data)
        
        # Assert category creation success
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_regular_user_cannot_create_category(self):
        # Log in as regular user
        self.client.login(username="user", password="user123")
        
        # Try to create category
        data = {"name": "New Category", "slug": "new-category"}
        response = self.client.post("/api/categories/", data)
        
        # Assert forbidden access
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_anonymous_user_cannot_create_category(self):
        # Send a request without logging in
        data = {"name": "New Category", "slug": "new-category"}
        response = self.client.post("/api/categories/", data)
        
        # Assert unauthorized access
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def tearDown(self):
        # Clean up the database
        Group.objects.all().delete()
        User.objects.all().delete()
