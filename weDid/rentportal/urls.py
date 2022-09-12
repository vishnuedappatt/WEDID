from . import views
from django.urls import path

urlpatterns = [  
    path('', views.hello, name="payment"),
    path('post/',views.rentpost,name='rentpost'),
  
    ]
