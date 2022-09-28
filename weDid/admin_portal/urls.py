from django.urls import path
from . views import *
from . import views
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register('user',user_list,basename='user_list')
router.register('job',job_list,basename='job_list')
router.register('rent',rent_list,basename='rent_list')


urlpatterns = [
   
]+router.urls