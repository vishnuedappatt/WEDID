from . import views
from django.urls import path

urlpatterns = [

    path('',views.hello,name='hello'),
    path('rentcate/',views.rentcategories,name='rentcategory'),
    path('jobcate/',views.jobcategories,name='rentcategory'),
    path('showcity/<int:id>/',views.getcity,name='get-city'),
    path('showdistrict/',views.getdistrict,name='get-district'),
    path('allcity/',views.getallcity,name='get-city'),
    path('jobpost/',views.jobpost,name='jobpost'),
    # path('alljob/',views.getallpost,name="alljob"),
    path('singlejob/<int:id>/',views.singlejobview,name="singleviewjob"),
    path('editjob/<int:id>/',views.editingjob,name='editjob'),
    path('payedjob/',views.paymentdone,name='payedjob'),
    path('viewjob/<int:id>/<int:cid>/',views.showjob,name="showjob"),
    path('dis_job_view/<int:id>/',views.disctrict_job_show,name="district_job_show"),
    path('all_job/',views.all_job_show,name="alljob"),
    ]
