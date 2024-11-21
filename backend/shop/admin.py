from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Attribute)
admin.site.register(AttributeValue)
admin.site.register(Basket)
admin.site.register(BasketProduct)
admin.site.register(Order)
admin.site.register(OrderProduct)
