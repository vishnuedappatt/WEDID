from django.urls import path
from . views import *
from . import views
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
# viewing and editing of user (like block and unblock)
router.register('user',user_list,basename='user_list')
# seeing all jobs
router.register('job',job_list,basename='job_list')
# seeing all rent
router.register('rent',rent_list,basename='rent_list')
# seeing the pending request of verification doned services
router.register('pay',accepting_payment,basename='pay')


urlpatterns = [
   # all profit view (only geting the profit amount)
   path('profit/',views.job_profit,name='profit'),
   # rent profit
   path('rentprofit/',views.rent_profit,name='rentprofit'),
   # for the graph data (Bar chart)
   path('graph/',views.sales_graph,name='graph'),
   # profit data of job
   path('profitjob/',views.job_profit_list,name='profit_job_list'),
   # profit data of rent
   path('profitrent/',views.rent_profit_list,name="profitrent"),
   # viewing complaint details
   path('complaint/',views.all_complaint,name='all_complaint'),
   
]+router.urls