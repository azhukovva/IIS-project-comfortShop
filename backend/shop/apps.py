from django.apps import AppConfig

# This is the configuration class for the shop app
class ShopConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "shop"
 
    def ready(self):
        import shop.signals