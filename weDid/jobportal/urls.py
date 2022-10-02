from . import views
from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter



router=DefaultRouter()
# editting of a job 
router.register('jobz',giving_job_edit,basename='edit_job_edit')

urlpatterns = [
    # getting rent category
    path('rentcate/',views.rentcategories,name='rentcategory'),
    # getting job category
    path('jobcate/',views.jobcategories,name='rentcategory'),
    # all city getting using district id (district vice city)
    path('showcity/<int:id>/',views.getcity,name='get-city'),
    # getting all district
    path('showdistrict/',views.getdistrict,name='get-district'),
    # getiing all city
    path('allcity/',views.getallcity,name='get-city'),
    # posting of a job
    path('jobpost/',views.jobpost,name='jobpost'),
    # single job  view
    path('singlejob/<int:id>/',views.singlejobview,name="singleviewjob"),
    # editing of a job
    path('editjob/<int:id>/',views.editingjob,name='editjob'),
    # for payment done for a submitter
    path('payedjob/',views.paymentdone,name='payedjob'),
    # filtering category and city vice
    path('viewjob/<int:id>/<int:cid>/',views.showjob,name="showjob"),
    # filtering disctrict vice
    path('dis_job_view/<int:id>/',views.disctrict_job_show,name="district_job_show"),
    # getting all jobs
    path('all_job/',views.all_job_show,name="alljob"),
    # for pagination
    path('all/',BillingRecordsView.as_view(),name='all'),
    # user giving service history
    path('giving_history_job/',views.Givingjob_history,name='job history'),
    # user taking service history
    path('taking_history_job/',views.taking_job_history,name='job_taking_history'),
    # today task for a employer (managing the job ,owner)
    path('verify_day_user/',views.Givingjob_verify_day,name='giving_job_verify'),
    # today task for a employee (task provider ,user)
    path('verify_day_employee/',views.employee_verify_day,name='employee_job_verify'),
    
    
    #for job verification 
    
    #  **************** #
   
    # getting the details of user for verification
    path('verifydata/<str:number>/',views.verify_data,name='verifydata'),
     # job starting of user (provider)   
    path('start_verify/',views.start_verify_data,name='start_verify'),
     # job start will verify the user (owner ,manger) 
    path('start_otp_check/',views.start_verify_check,name='start_verify_check'),
    # job end of user (provider)
     path('end_verify/',views.end_verify_data,name='end_verify'),
    # job end will confirm by user(owner)
    path('end_otp_check/',views.end_verify_check,name='end_verify_check'),
    
    # total given expense ,like owner
    path('giving_exp/',views.total_giving_expense,name='toal_exp'),
    # total profit earned by user (provider via service)
    path('revenue/',views.total_revenue,name='toal_reve'),
    # total completed services (verification completed)
    path('completed/',views.total_completed_task,name="completed"),
    # for job complaints (only  verification and admin response will done)
    path('complaint/',views.job_complaint,name='job_complaint'),
    
    ]+router.urls
