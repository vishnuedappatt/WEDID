from django.contrib import admin
from .models import Account,Categories,District,City

# Register your models here.
admin.site.register(Account)
admin.site.register(Categories)
admin.site.register(District)
admin.site.register(City)
