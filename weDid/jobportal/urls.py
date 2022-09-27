from . import views
from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter



router=DefaultRouter()
router.register('jobz',giving_job_edit,basename='edit_job_edit')
# router.register('verify',VerificatinData,basename='verify')

urlpatterns = [
    
    path('',views.hello,name='hello'),
    path('rentcate/',views.rentcategories,name='rentcategory'),
    path('jobcate/',views.jobcategories,name='rentcategory'),
    path('showcity/<int:id>/',views.getcity,name='get-city'),
    path('showdistrict/',views.getdistrict,name='get-district'),
    path('allcity/',views.getallcity,name='get-city'),
    path('jobpost/',views.jobpost,name='jobpost'),
    path('singlejob/<int:id>/',views.singlejobview,name="singleviewjob"),
    path('editjob/<int:id>/',views.editingjob,name='editjob'),
    path('payedjob/',views.paymentdone,name='payedjob'),
    path('viewjob/<int:id>/<int:cid>/',views.showjob,name="showjob"),
    path('dis_job_view/<int:id>/',views.disctrict_job_show,name="district_job_show"),
    path('all_job/',views.all_job_show,name="alljob"),
    path('all/',BillingRecordsView.as_view(),name='all'),
    path('giving_history_job/',views.Givingjob_history,name='job history'),
    path('taking_history_job/',views.taking_job_history,name='job_taking_history'),
    path('verify_day_user/',views.Givingjob_verify_day,name='giving_job_verify'),
    path('verify_day_employee/',views.employee_verify_day,name='employee_job_verify'),
    
    path('verifydata/<str:number>/',views.verify_data,name='verifydata'),
    path('start_verify/',views.start_verify_data,name='start_verify'),
    path('start_otp_check/',views.start_verify_check,name='start_verify_check'),
    path('end_verify/',views.end_verify_data,name='end_verify'),
    path('end_otp_check/',views.end_verify_check,name='end_verify_check'),
    
    
    path('giving_exp/',views.total_giving_expense,name='toal_exp'),
    path('revenue/',views.total_revenue,name='toal_reve'),
    path('completed/',views.total_completed_task,name="completed"),
    
    ]+router.urls
