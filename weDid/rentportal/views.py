from email.mime import image
from django.shortcuts import render
from django.shortcuts import render,redirect
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from user.models import Account,UserToken,Categories,District,City
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
import random
import datetime
from user.authentication import ADMINAuth, JWTAuthentications, create_access_token,create_refresh_token,decode_access_token,decode_refresh_token
from .models import Rent_detail
from .serializer import RentSerializer
from user.authentication import JWTAuthentications
from jobportal.serializer import  CategorySerializer,CitySerializer,DistrictSerializer

# Create your views here.
def hello(request):
    pass


@api_view(["POST"])
@authentication_classes([JWTAuthentications])
def rentpost(request):
    data=request.data
    user=request.user
    mobiles=user.mobile  
    print(data)
    print(mobiles)
    print(data)
    yr= int(datetime.date.today().strftime('%Y'))
    dt= int(datetime.date.today().strftime('%d'))
    mt= int(datetime.date.today().strftime('%m'))
    d=datetime.date(yr,mt,dt)
    current_date =d.strftime("%Y%m%d")
   

    val=(random.randint(1, 99))
    order_number=current_date +str(user.id)+str(val)
    print(order_number)
   
    
    job= Rent_detail.objects.create(        
        user=user,
        mobile=mobiles,
        district_id=request.data['district'],
        city_id=request.data['city'],
        title=request.data['title'],
        category_id=request.data['category'],
        discriptions=request.data['discription'],
        sub_mobile=request.data['sub_mobile'],           
        place=request.data['place'],
        address=request.data['address'],
        rate=request.data['rate'],
        slug=request.data['slug'],
        available=True,
        ordernumber=order_number,  
        image=request.FILES['image'],
        image1=request.FILES['image1'],
        image2=request.FILES['image2'],
        price_in=request.data['price_in'],
                  
    )     
    serializer=RentSerializer(job,many=False)
    return Response(serializer.data)                    


# category for rent
@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def rentcategories(request):
    rent=Categories.objects.filter(category_of='rent')
    serializer=CategorySerializer(rent,many=True)
    return Response(serializer.data)

# all data
@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def all_rent_show(request):
    try:      
       
        job=Rent_detail.objects.filter(payment='True',booked='False',available='True')
        serializer=RentSerializer(job,many=True)
        return Response(serializer.data)
    except:
        response=Response()
        response.data={
            'error':'error in request'
        }
        return response 


# for compliting the post and showing on posted surface
@api_view(['POST'])
# @authentication_classes([JWTAuthentications])
def rentpaymentdone(request):
    data=request.data
    print(data)
    orderid=data['order_number']
    print(orderid)
    rent=Rent_detail.objects.filter(ordernumber=orderid).exists()
    if not rent:
        response=Response()
        response.data={
            'error':'this item is not present '
        }
        return response 
    else:
        rent=Rent_detail.objects.get(ordernumber=orderid)
        rent.payment=True
        rent.save()
        serializer=RentSerializer(rent,many=False)
        return Response(serializer.data)
    