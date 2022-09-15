from . import views
from .views import *
from django.urls import path

urlpatterns = [  
    path('', views.hello, name="payment"),
    path('post/',views.rentpost,name='rentpost'),
    path('rentcategory/',views.rentcategories,name='rentcategory'),
    path('all/',views.all_rent_show,name='allrent'),
    path('payment/finish/',views.rentpaymentdone,name='rentpayment'),
    path('filterdistrict/<int:id>/',views.disctrict_rent_show,name='filter-district'),
    path('filter/<int:id>/<int:cid>/',views.filter_rent_show,name='filter'),
    path('search/',Rentitems.as_view(),name='search'),
      
    ]
