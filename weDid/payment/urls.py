from . import views
from django.urls import path

urlpatterns = [  
    # for starting action of razorpay pop up and object creation
    path('pay/', views.start_payment, name="payment"),
    # razorpay response giving (success or failure)
    path('payment/success/',views.handle_payment_success, name="payment_success"),
    # its for 1st free  service (last submit of submitting job,taking service)
    path('free/',views.freepayment,name="freepayment"),
    # its for payment finishing of rent
    path('finish/',views.payemntfinish,name='pamentfinish'),
    ]
