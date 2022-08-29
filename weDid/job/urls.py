from . import views
from django.urls import path

urlpatterns = [

    path('',views.hello,name='hello'),
    path('rentcate/',views.rentcategories,name='rentcategory'),
    path('jobcate/',views.jobcategories,name='rentcategory'),
    path('showcity/<int:id>/',views.getcity,name='get-city'),
    path('showdistrict/',views.getdistrict,name='get-district'),
    path('jobpost/',views.jobpost,name='jobpost'),
    ]
