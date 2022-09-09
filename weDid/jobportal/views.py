from django.shortcuts import render
import datetime
import re
from django.shortcuts import render,redirect
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from user.models import Account,UserToken,Categories,District,City
from .models import Job_Detail
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
import random
from user.authentication import ADMINAuth, JWTAuthentications, create_access_token,create_refresh_token,decode_access_token,decode_refresh_token
from .serializer import CategorySerializer,CitySerializer,DistrictSerializer,JobSerializer,EditJobSerializer


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


# showing all the city as per disctrict

@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def getallcity(request):
    city=City.objects.all()
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
   

    val=(random.randint(1, 99))
    order_number=current_date +str(user.id)+str(val)
    print(order_number)
   
   
    job= Job_Detail.objects.create(
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
        
    



# all job view

@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def getallpost(request):
    job=Job_Detail.objects.all()
    serializer=JobSerializer(job,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def singlejobview(request,id):
    job=Job_Detail.objects.get(id=id)
    serializer=JobSerializer(job,many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@authentication_classes([JWTAuthentications])
def editingjob(request,id):
    try:
        print('d111211')
        job=Job_Detail.objects.get(id=id)
        edit=EditJobSerializer(instance=job,data=request.data)
        if edit.is_valid():
            print('dfdf')
            edit.save()
        return Response(edit.data)
    except:
        response=Response()
        response.data={
            'message':'password miss match '
        }
        return response  
    
    
# for compliting the post and showing on posted surface
@api_view(['POST'])
# @authentication_classes([JWTAuthentications])
def paymentdone(request):
    # try:
    data=request.data
    orderid=data['order_number']
    print(orderid)
    job=Job_Detail.objects.filter(ordernumber=orderid).exists()
    print(job,'dfffd')
    if not job:
        response=Response()
        response.data={
            'error':'this item is not present '
        }
        return response 
    else:
        job=Job_Detail.objects.get(ordernumber=orderid)
        job.payment=True
        job.save()
        serializer=JobSerializer(job,many=False)
        return Response(serializer.data)
    
 
#  filter with category and place
@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def showjob(request,id,cid):
    try:
        category=Categories.objects.get(id=id)
        print(category)
        city=City.objects.get(id=cid)
        print(city)
        job=Job_Detail.objects.filter(category=category,city=city,payment='True',booked='False',available='True')
        serializer=JobSerializer(job,many=True)
        return Response(serializer.data)
    except:
        response=Response()
        response.data={
            'error':'error in request'
        }
        return response 


#filter with district 
 
@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def disctrict_job_show(request,id):
    try:        
        district=District.objects.get(id=id)
        print(district)
        job=Job_Detail.objects.filter(district=district,payment='True',booked='False',available='True')
        serializer=JobSerializer(job,many=True)
        return Response(serializer.data)
    except:
        response=Response()
        response.data={
            'error':'error in request'
        }
        return response 
    
    
# all data
@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def all_job_show(request):
    try:        
        district=District.objects.all()
        print(district)
        job=Job_Detail.objects.filter(payment='True',booked='False',available='True')
        serializer=JobSerializer(job,many=True)
        return Response(serializer.data)
    except:
        response=Response()
        response.data={
            'error':'error in request'
        }
        return response 