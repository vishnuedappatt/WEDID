from . import views
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router=DefaultRouter()
router.register('profile',userprofile,basename='userprofile')
router.register('addbank',bank_create,basename='bank_create')
router.register('addupi',upi_create,basename='upi_create')

urlpatterns = [

    path('register/',views.Register,name='register'),
    path('verify/',views.verification,name='verification'),
    path('login/',views.Login,name='login'),
    path('use/',views.alluser,name='users'),
    path('refresh/',views.refresh,name='refresh'),
    path('logout/',views.Logout,name='logout'),
    path('forgotpassword/',views.forgotpassword,name='forgottpassword'),
    path('resetpassword_validate/<uidb64>/<token>',views.resetpassword_validate,name="resetpassword_validate"),
    path('resetPassword/',views.resetPassword,name="resetPassword"),
    path('profile/change_password/',views.change_password,name='change password'),
    path('profiles/',views.single_user_profile,name='single_user'),
    
    path('bank_user/',bank_of_user,name='bank_of_user'),
    path('upi_user/',upi_of_user,name='upi_of_user'),

  
    ]+router.urls
