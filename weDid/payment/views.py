from django.shortcuts import render
import json
import razorpay
from rest_framework.decorators import api_view,authentication_classes
from rest_framework.response import Response
from django.conf import settings
from .models import Order
from .serializers import OrderSerializer
from user.authentication import JWTAuthentications


@api_view(['POST'])
@authentication_classes([JWTAuthentications])
def start_payment(request):   
    amount = request.data['amount']
    name = request.data['name']    
   
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
    order = Order.objects.create(order_product=name, 
                                 order_amount=amount, 
                                 order_payment_id=payment['id'])

    serializer = OrderSerializer(order)

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
    # res = json.loads(request.data["response"])
    res=request.data['response']
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
    order = Order.objects.get(order_payment_id=ord_id)
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
    ord= Order.objects.get(order_payment_id=ord_id)
    print(ord)
    ord.isPaid =True 
    ord.save()
    
    print(66)
    response=Response()
    response.data = {
        'message': 'payment successfully completed'
    }
    print(77)
    return response