from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_migrate
from django.dispatch import receiver
from .models import ProposedCategory, ProposedProduct

User = get_user_model()

@receiver(post_migrate)
def create_groups(sender, **kwargs):
    Group.objects.get_or_create(name='admin')
    Group.objects.get_or_create(name='moderator')
    Group.objects.get_or_create(name='entrepreneur')
    Group.objects.get_or_create(name='user')  

@receiver(post_save, sender=User)
def assign_default_role(sender, instance, created, **kwargs):
    if created:  
        try:
            group = Group.objects.get(name='user')  
            instance.groups.add(group)  
        except Group.DoesNotExist:
            print("Default group 'user' does not exist. Please check group creation.")

@receiver(post_save, sender=ProposedCategory)
@receiver(post_save, sender=ProposedProduct)
def add_to_interpreneur_group(sender, instance, created, **kwargs):
    if created:
        user = instance.user
        group, created = Group.objects.get_or_create(name="interpreneur")
        if not user.groups.filter(name="interpreneur").exists():
            user.groups.add(group)            