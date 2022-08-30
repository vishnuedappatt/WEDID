from django.shortcuts import render
import datetime
import re
from django.shortcuts import render,redirect
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from user.models import Account,UserToken,Categories,District,City
from .models import JobPortal

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from user.authentication import ADMINAuth, JWTAuthentications, create_access_token,create_refresh_token,decode_access_token,decode_refresh_token
from .serializer import CategorySerializer,CitySerializer,DistrictSerializer,JobSerializer

# Create your views here.


def hello(request):
    pass
# gettting rent categories

@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def rentcategories(request):
    rent=Categories.objects.filter(category_of='rent')
    serializer=CategorySerializer(rent,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([JWTAuthentications])
# @permission_classes([IsAuthenticated])
def jobcategories(request):
    rent=Categories.objects.filter(category_of='job')
    serializer=CategorySerializer(rent,many=True)
    return Response(serializer.data)
 
 
# showing all district
 
@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def getdistrict(request):   
    district=District.objects.all()
    serializer=DistrictSerializer(district,many=True)
    return Response(serializer.data)    


# showing the city as per disctrict

@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def getcity(request,id):
    district=District.objects.get(id=id)
    city=City.objects.filter(district=district)
    serializer=CitySerializer(city,many=True)
    return Response(serializer.data)





@api_view(['POST'])
@authentication_classes([JWTAuthentications])
def jobpost(request):
    data=request.data
    user=request.user
    count=user.count    
    mobiles=user.mobile  
    print(mobiles)
    print(data)
    yr= int(datetime.date.today().strftime('%Y'))
    dt= int(datetime.date.today().strftime('%d'))
    mt= int(datetime.date.today().strftime('%m'))
    d=datetime.date(yr,mt,dt)
    current_date =d.strftime("%Y%m%d")
    order_number=current_date +str(user.id)
    print(order_number)
   
    if(count<=2):  
        job= JobPortal.objects.create(
            user=user,
            mobile=mobiles,
            district_id=data['district'],
            city_id=data['city'],
            title=data['title'],
            category_id=data['category'],
            discriptions=data['discription'],
            sub_mobile=data['sub_mobile'],           
            place=data['place'],
            address=data['address'],
            rate=data['rate'],
            slug=data['slug'],
            available=True,
            ordernumber=order_number,            
        )   
        user.count+=1
        user.save()        
        serializer=JobSerializer(job,many=False)
        return Response(serializer.data)                                                                                                                           
        
        
    else:       
    
        job= JobPortal.objects.create(
        user=user,
        mobile=mobiles,
        district_id=data['district'],
        city_id=data['city'],
        title=data['title'],
        category_id=data['category'],
        discriptions=data['discription'],
        sub_mobile=data['sub_mobile'],           
        place=data['place'],
        address=data['address'],
        rate=data['rate'],
        slug=data['slug'],
        available=True,     
        ordernumber=order_number,       
    )  
        serializer=JobSerializer(job,many=False)
        return Response(serializer.data)     
   

