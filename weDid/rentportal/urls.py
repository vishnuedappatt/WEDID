from email.mime import base
from . import views
from .views import *
from django.urls import path
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register('rents',Edit_giving_job,basename='edit_rent')
urlpatterns = [  
    path('post/',views.rentpost,name='rentpost'),
    path('rentcategory/',views.rentcategories,name='rentcategory'),
    path('all/',views.all_rent_show,name='allrent'),
    path('payment/finish/',views.rentpaymentdone,name='rentpayment'),
    path('filterdistrict/<int:id>/',views.disctrict_rent_show,name='filter-district'),
    path('filter/<int:id>/<int:cid>/',views.filter_rent_show,name='filter'),
    path('search/',Rentitems.as_view(),name='search'),
    path('singleview/<int:id>/',views.singlerentview,name='singlerent view'),
    path('rent_giving_history/',views.Giving_rent_history,name='giving_rent_history'),
    path('rent_taking_history/',views.taking_rent_history,name='taking_rent_history'),
    
    path('completed/',views.total_completed_task,name="completed"),
    
    path('complaint/',views.rent_complaint,name='rent_complaint'),
    
      
    ]+router.urls
