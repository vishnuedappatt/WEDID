from . import views
from django.urls import path

urlpatterns = [  
    path('', views.hello, name="payment"),
    path('post/',views.rentpost,name='rentpost'),
    path('rentcategory/',views.rentcategories,name='rentcategory'),
    path('all/',views.all_rent_show,name='allrent'),
    path('payment/finish/',views.rentpaymentdone,name='rentpayment'),
  
    ]
