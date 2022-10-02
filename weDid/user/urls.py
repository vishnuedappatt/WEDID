from . import views
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router=DefaultRouter()
# for user all users
router.register('profile',userprofile,basename='userprofile')
# adding and deleting of bank details in user profile
router.register('addbank',bank_create,basename='bank_create')
# adding and deleting of upi details in user profile
router.register('addupi',upi_create,basename='upi_create')

urlpatterns = [
    # for user registration
    path('register/',views.Register,name='register'),
    # for otp verification
    path('verify/',views.verification,name='verification'),
    # for login of user and admin
    path('login/',views.Login,name='login'),
    # for getting account table
    path('use/',views.alluser,name='users'),
    # for refresh token
    path('refresh/',views.refresh,name='refresh'),
    # for logout
    path('logout/',views.Logout,name='logout'),
    # for forgotpassword
    path('forgotpassword/',views.forgotpassword,name='forgottpassword'),
    # password resetting of forgotten user
    path('resetpassword_validate/<uidb64>/<token>',views.resetpassword_validate,name="resetpassword_validate"),
    #  saving the forgotten password
    path('resetPassword/',views.resetPassword,name="resetPassword"),
    #  user password reset
    path('profile/change_password/',views.change_password,name='change password'),
    # for user profile viewing
    path('profiles/',views.single_user_profile,name='single_user'),
    # for  viewing bank details of user
    path('bank_user/',bank_of_user,name='bank_of_user'),
    # for viewing upi details of user
    path('upi_user/',upi_of_user,name='upi_of_user'),

  
    ]+router.urls
