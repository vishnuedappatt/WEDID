from django.urls import path
from . views import *
from . import views
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register('user',user_list,basename='user_list')
router.register('job',job_list,basename='job_list')
router.register('rent',rent_list,basename='rent_list')


urlpatterns = [
   path('profit/',views.job_profit,name='profit'),
   path('rentprofit/',views.rent_profit,name='rentprofit'),
   path('graph/',views.sales_graph,name='graph'),
   path('profitjob/',views.job_profit_list,name='profit_job_list'),
   path('profitrent/',views.rent_profit_list,name="profitrent"),
]+router.urls