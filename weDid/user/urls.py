from . import views
from django.urls import path

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
    path('profile/',views.userdata,name='userdata'),
  
    ]
