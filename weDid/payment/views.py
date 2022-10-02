from django.shortcuts import render
import json
import razorpay
from rest_framework.decorators import api_view,authentication_classes
from rest_framework.response import Response
from django.conf import settings
# for mail
from django.core.mail import send_mail
from user.models import Account
from .models import Order, OrderRent
from .serializers import OrderSerializer,OrderRentSerializer
from user.authentication import JWTAuthentications
from jobportal.models import Job_Detail
from jobportal.serializer import JobSerializer
from rentportal.models import Rent_detail
from rentportal.serializer import RentSerializer


@api_view(['POST'])
@authentication_classes([JWTAuthentications])
def start_payment(request):   
    data=request.data
    print(data)
    amount = request.data['amount']
    name = request.data['name']    
    type=request.data['typez']
    buyer=request.data['buyer']
    client = razorpay.Client(auth=(settings.RAZORPAY_PUBLIC_KEY,settings.RAZORPAY_SECRET_KEY))

    # create razorpay order
    # the amount will come in 'paise' that means if we pass 50 amount will become
    # 0.5 rupees that means 50 paise so we have to convert it in rupees. So, we will 
    # mumtiply it by 100 so it will be 50 rupees.
    payment = client.order.create({"amount": int(amount) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})

    # we are saving an order with isPaid=False because we've just initialized the order
    # we haven't received the money we will handle the payment succes in next 
    # function
    if type=='job':        
        if buyer =='yes':
            order = Order.objects.create(order_product=name, 
                                        order_amount=amount, 
                                        order_payment_id=payment['id'],
                                        buyer=True)
            serializer = OrderSerializer(order)
            
        else:
            order = Order.objects.create(order_product=name, 
                                        order_amount=amount, 
                                        order_payment_id=payment['id'])
            
            serializer = OrderSerializer(order)
    else:
        if buyer =='yes':
            order = OrderRent.objects.create(order_product=name, 
                                    order_amount=amount, 
                                    order_payment_id=payment['id'],
                                    buyer=True)
            serializer = OrderRentSerializer(order)
        
        else:
            order = OrderRent.objects.create(order_product=name, 
                                        order_amount=amount, 
                                        order_payment_id=payment['id'])
            serializer = OrderRentSerializer(order)

   

    """order response will be 
    {'id': 17, 
    'order_date': '23 January 2021 03:28 PM', 
    'order_product': '**product name from frontend**', 
    'order_amount': '**product amount from frontend**', 
    'order_payment_id': 'order_G3NhfSWWh5UfjQ', # it will be unique everytime
    'isPaid': False}"""

    data = {
        "payment": payment,
        "order": serializer.data
    }
    return Response(data)


@api_view(['POST'])
@authentication_classes([JWTAuthentications])
def handle_payment_success(request):
    # request.data is coming from frontend
    data=request.data
    print(data)
    res = json.loads(request.data["response"])
    type=request.data["typez"]
    # res=request.data['response']
    
    print(res,'response is hweww')

    """res will be:
    {'razorpay_payment_id': 'pay_G3NivgSZLx7I9e', 
    'razorpay_order_id': 'order_G3NhfSWWh5UfjQ', 
    'razorpay_signature': '76b2accbefde6cd2392b5fbf098ebcbd4cb4ef8b78d62aa5cce553b2014993c0'}
    this will come from frontend which we will use to validate and confirm the payment
    """

    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""

    # res.keys() will give us list of keys in res
    for key in res.keys():
        if key == 'razorpay_order_id':
            ord_id = res[key]
            print(ord_id,'order id')
        elif key == 'razorpay_payment_id':
            raz_pay_id = res[key]
            print(raz_pay_id,'pay id')
        elif key == 'razorpay_signature':
            raz_signature = res[key]
            print(raz_signature ,'signature')
    # get order by payment_id which we've created earlier with isPaid=False
    if type=='job':
        order = Order.objects.get(order_payment_id=ord_id)
    else:
        order = OrderRent.objects.get(order_payment_id=ord_id)
    print(order,'order')
    print(11)
    # we will pass this whole data in razorpay client to verify the payment
    data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
    }
    print(22)
    client = razorpay.Client(auth=(settings.RAZORPAY_PUBLIC_KEY,settings.RAZORPAY_SECRET_KEY))
    print(33)
    # checking if the transaction is valid or not by passing above data dictionary in 
    # razorpay client if it is "valid" then check will return None
    check = client.utility.verify_payment_signature(data)
    print(44)
    print(check)
    if check is  None:
        print("Redirect to error url or error page")
        response=Response()
        response.data = {
            'error': 'payment successfully received!'
        }
        return response
    print(55)
    # if payment is successful that means check is None then we will turn isPaid=True
    if type=='job':
        ord= Order.objects.get(order_payment_id=ord_id)
        print(ord)
        ord.isPaid =True 
        ord.save()    
        val=ord.order_product
        case=ord.buyer
        user=request.user
        if case:
            job=Job_Detail.objects.get(ordernumber=val)
            job.booked_person=user
            job.booked=True
            job.save()
            user=Account.objects.get(email=user)
            user.count+=1
            user.save()     

            send_mail( 'From WEDID ',
                f'Thank You For purchase our service \n, {job.title} service posted  by mr.{job.user.first_name} ,\n you can contact +91{job.mobile} ,+91{job.sub_mobile}  , \n thankyou ',
                'wedidsolutions@gmail.com'
                ,[user.email]   
                ,fail_silently=False)
            send_mail( 'From WEDID ',
                f'congradulations  !!!  Your service got purchased   \n, {job.title} service is takened by   {request.user.first_name} ,\n you can contact +91{request.user.mobile} , \n thankyou ',
                'wedidsolutions@gmail.com'
                ,[job.user.email]   
                ,fail_silently=False)
        else:            
            job=Job_Detail.objects.get(ordernumber=val)
            job.payment=True
            job.save()
             
        
        
    else:
        ord= OrderRent.objects.get(order_payment_id=ord_id)
        print(ord)
        ord.isPaid =True 
        ord.save()
        val=ord.order_product
        case=ord.buyer
        user=request.user
        if case:
            rent=Rent_detail.objects.get(ordernumber=val)
            rent.booked_person=user
            rent.booked=True
            rent.available=False
            rent.save()
            user=Account.objects.get(email=user)
            user.count+=1
            user.save()  
        
        
        else:            
            job=Rent_detail.objects.get(ordernumber=val)
            job.payment=True
            job.save()
    response=Response()
    response.data = {
        'message': 'payment successfully completed'
    }
   
    return response





@api_view(['POST'])
@authentication_classes([JWTAuthentications])
def freepayment(request):
    try:
        print('gert in to rent')
        data=request.data
        email=request.user
        id=data['id']
        job=Job_Detail.objects.get(id=id)
        job.booked_person=email
        job.booked=True
        job.save()
        user=Account.objects.get(email=email)
        user.count+=1
        user.save()        
        serializer=JobSerializer(job,many=False)     
        print(email.first_name,'email is')
        mobile=job.mobile
        print(mobile,'dkjfkldjklf')
        print('ddddd')
        
        send_mail( 'From WEDID ',
            f'Thank You For purchase our service \n, {job.title} service posted  by mr.{job.user.first_name} ,\n you can contact +91{job.mobile} ,+91{job.sub_mobile}  , \n thankyou ',
            'wedidsolutions@gmail.com'
            ,[email]   
            ,fail_silently=False)
        send_mail( 'From WEDID ',
            f'congradulations  !!!  Your service got purchased   \n, {job.title} service is takened by   {request.user.first_name} ,\n you can contact +91{request.user.mobile} , \n thankyou ',
            'wedidsolutions@gmail.com'
            ,[job.user.email]   
            ,fail_silently=False)
        print('lll')
    
        return Response(serializer.data)
    except:
        response=Response()
        response.data = {
            'error': 'Error found'
        }
        return response
    
    

@api_view(['POST'])
@authentication_classes([JWTAuthentications])
def payemntfinish(request):
    try:
        data=request.data
        email=request.user
        id=data['id']              
        rent=Rent_detail.objects.get(id=id)
        rent.booked_person=email
        rent.booked=True
        
        rent.available=False
        rent.save()      
        send_mail( 'From WEDID ',
            f'Thank You For purchase our Rent service \n, {rent.title} service posted  by mr.{rent.user.first_name} ,\n you can contact +91{rent.mobile} ,+91{rent.sub_mobile}  , \n thankyou ',
            'wedidsolutions@gmail.com'
            ,[email]   
            ,fail_silently=False)
        send_mail( 'From WEDID ',
            f'congradulations  !!!  Your Rent service got purchased   \n, {rent.title} service is takened by   {request.user.first_name} ,\n you can contact +91{request.user.mobile} , \n thankyou ',
            'wedidsolutions@gmail.com'
            ,[rent.user.email]   
            ,fail_silently=False)       
        serializer=RentSerializer(rent,many=False)
        return Response(serializer.data)
    except:
        response=Response()
        response.data = {
            'error': 'Error found'
        }
        return response