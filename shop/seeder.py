from django.contrib.auth.models import Group, Permission, User


def seed_data():
    try:
        # CREATE GROUPS
        admin_group, created = Group.objects.get_or_create(name="admin")
        moderator_group, created = Group.objects.get_or_create(name="moderator")

    except Exception as e:
        pass


if __name__ == "__main__":
    seed_data()
