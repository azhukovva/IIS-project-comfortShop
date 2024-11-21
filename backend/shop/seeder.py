from django.contrib.auth.models import Group, Permission, User

from .models import Category


def seed_data():
    try:
        # CREATE GROUPS
        admin_group, created = Group.objects.get_or_create(name="admin")
        moderator_group, created = Group.objects.get_or_create(name="moderator")

        # CREATE EXAMPLE CATEGORIES
        books_category, created = Category.objects.get_or_create(name="Books", slug="books", parent=None)
        fiction_category, created = Category.objects.get_or_create(
            name="Fiction", slug="fiction", parent=books_category
        )
        non_fiction_category, created = Category.objects.get_or_create(
            name="Non-Fiction", slug="non-fiction", parent=books_category
        )

        candles_category, created = Category.objects.get_or_create(name="Candles", slug="candles", parent=None)
        scented_category, created = Category.objects.get_or_create(
            name="Scented", slug="scented", parent=candles_category
        )
        unscented_category, created = Category.objects.get_or_create(
            name="Unscented", slug="unscented", parent=candles_category
        )

    except Exception as e:
        pass


if __name__ == "__main__":
    seed_data()
