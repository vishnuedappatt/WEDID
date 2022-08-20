from . import views
from django.urls import path,include

urlpatterns = [

    path('register/',views.Register,name='register'),
    path('verify/',views.verification,name='verification'),
]
