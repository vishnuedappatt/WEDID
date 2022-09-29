from django.contrib import admin
from .models import Account,Categories,District,City,BankDetails,UPIDetails

# Register your models here.
admin.site.register(Account)
admin.site.register(Categories)
admin.site.register(District)
admin.site.register(City)
admin.site.register(BankDetails)
admin.site.register(UPIDetails)
