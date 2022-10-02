from email.mime import base
from . import views
from .views import *
from django.urls import path
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
# editing of rent details
router.register('rents',Edit_giving_job,basename='edit_rent')
urlpatterns = [  
    # rent posting
    path('post/',views.rentpost,name='rentpost'),
    # getting rent category
    path('rentcategory/',views.rentcategories,name='rentcategory'),
    # getting all rent items
    path('all/',views.all_rent_show,name='allrent'),
    # payment finishing of rent
    path('payment/finish/',views.rentpaymentdone,name='rentpayment'),
    # getting district vice rent item
    path('filterdistrict/<int:id>/',views.disctrict_rent_show,name='filter-district'),
    # getting city category vice rent item
    path('filter/<int:id>/<int:cid>/',views.filter_rent_show,name='filter'),
    # searching of rent item
    path('search/',Rentitems.as_view(),name='search'),
    # single view of rent item 
    path('singleview/<int:id>/',views.singlerentview,name='singlerent view'),
    # rent item  giving for a user (history)
    path('rent_giving_history/',views.Giving_rent_history,name='giving_rent_history'),
    # rent item taken for a single user (history)
    path('rent_taking_history/',views.taking_rent_history,name='taking_rent_history'),
    # the completed task of a rent item (return backed)
    path('completed/',views.total_completed_task,name="completed"),
    # for rent complaint register (only possible for item returned)
    path('complaint/',views.rent_complaint,name='rent_complaint'),
    
      
    ]+router.urls
