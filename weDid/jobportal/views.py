from django.shortcuts import render
import datetime
from django.shortcuts import render,redirect
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from user.models import Account,UserToken,Categories,District,City
from .models import Job_Detail,JobVerification
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
import random
from user.authentication import ADMINAuth, JWTAuthentications, create_access_token,create_refresh_token,decode_access_token,decode_refresh_token
from .serializer import CategorySerializer,CitySerializer,DistrictSerializer, JobHistorySerializer,JobSerializer,EditJobSerializer, JobVerificationSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics
from rest_framework import viewsets
from . import serializer
from django_filters import rest_framework as filters
from user.verify import send,check
from rest_framework  import status
from django.core.mail import send_mail
# Create your views here.



# gettting rent categories

@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def rentcategories(request):
    rent=Categories.objects.filter(category_of='rent')
    serializer=CategorySerializer(rent,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([JWTAuthentications])
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
    mobiles=user.mobile 
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
        valid_at =data['date'],      
    )   
    user.count+=1
    user.save()    
    verify=JobVerification()
    verify.mobile=mobiles
    verify.order_number=order_number
    verify.name=data['title']
    verify.save()
    serializer=JobSerializer(job,many=False)
    return Response(serializer.data)                                                                                                                           
        
    



# all job view

@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def getallpost(request):
    now=datetime.datetime.now()
    job=Job_Detail.objects.filter(payment='True',booked='False',available='True',valid_at__gte=now)
    serializer=JobSerializer(job,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def singlejobview(request,id):
    job=Job_Detail.objects.get(id=id)
    serializer=JobSerializer(job,many=False)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def singlejobview_withBooked_person(request,id):
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

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
 
   
class BillingRecordsView(generics.ListAPIView):
    authentication_classes = [JWTAuthentications]
    queryset =Job_Detail.objects.filter(payment='True',booked='False',available='True')
    serializer_class = JobSerializer
    pagination_class = LargeResultsSetPagination
    
    

@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def Givingjob_history(request):
    user=request.user
    job=Job_Detail.objects.filter(user__email=user)
    serializer=JobHistorySerializer(job,many=True)
    return Response(serializer.data)
  
    
class giving_job_edit(viewsets.ModelViewSet):
    authentication_classes=[JWTAuthentications]
    queryset=Job_Detail.objects.all()
    serializer_class=JobSerializer
  

    
    
    
@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def taking_job_history(request):
    user=request.user
    print(user,'kkkkkkk')
    job=Job_Detail.objects.filter(booked_person__email=user)
    serializer=JobHistorySerializer(job,many=True)
    return Response(serializer.data)
  
  
  
# day for verify
@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def Givingjob_verify_day(request):
    user=request.user
    now=datetime.datetime.now()
    job=Job_Detail.objects.filter(user__email=user,valid_at=now)
    serializer=JobHistorySerializer(job,many=True)
    return Response(serializer.data)
  
  
# day for verify table
@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def employee_verify_day(request):
    user=request.user
    now=datetime.datetime.now()
    job=Job_Detail.objects.filter(booked_person__email=user,valid_at=now) 
    serializer=JobHistorySerializer(job,many=True)
    return Response(serializer.data)
  
  
# day for verify
@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def verify_data(request,number):
    print(number,'number')
    verify=JobVerification.objects.get(order_number=number)
    serializer=JobVerificationSerializer(verify,many=False)
    return Response(serializer.data)




# staring job verification
@api_view(['POST'])
@authentication_classes([JWTAuthentications])
def start_verify_data(request):
    data=request.data
    number=data['number']
    print(number,'ithhh')
    verify=JobVerification.objects.get(order_number=number)
    mobile=verify.mobile
    print(mobile,'mobile')
    send(mobile)
    verify.job_start=True
    verify.start_otp=True
    verify.save()
    serializer=JobVerificationSerializer(verify,many=False)
    return Response(serializer.data)
    
    
    
# staring job verification
@api_view(['POST'])
@authentication_classes([JWTAuthentications])
def start_verify_check(request):
    data=request.data
    number=data['number']
    print(number,'uuuuupopp')
    code=data['otp']
    print(code,'jkjkjkj')
    verify=JobVerification.objects.get(order_number=number)
    mobile=verify.mobile
    if check(mobile,code):  
        verify.start_verify=True
        verify.save()
        # send_mail( 'From WEDID ',
        #     f'congradulations  !!!  Your Rent service got purchased   \n, {rent.title} service is takened by   {request.user.first_name} ,\n you can contact +91{request.user.mobile} , \n thankyou ',
        #     'wedidsolutions@gmail.com'
        #     ,[rent.user.email]   
        #     ,fail_silently=False)
        serializer=JobVerificationSerializer(verify,many=False)
        return Response(serializer.data)
    else:
        message={'error':'otp is not valid'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


# staring job verification
@api_view(['POST'])
@authentication_classes([JWTAuthentications])
def end_verify_data(request):
    data=request.data
    number=data['number'] 
    verify=JobVerification.objects.get(order_number=number)
    mobile=verify.mobile
    print(mobile,'mobile')
    send(mobile)
    verify.end_otp=True
    verify.save()
    serializer=JobVerificationSerializer(verify,many=False)
    return Response(serializer.data)
     
    
# staring job verification
@api_view(['POST'])
@authentication_classes([JWTAuthentications])
def end_verify_check(request):
    data=request.data
    number=data['number']
    code=data['otp']
    verify=JobVerification.objects.get(order_number=number)
    mobile=verify.mobile
    if check(mobile,code):  
        verify.end_verify=True
        verify.save()
        job=Job_Detail.objects.get(ordernumber=number)
        job.verified=True
        job.save()
        serializer=JobVerificationSerializer(verify,many=False)
        return Response(serializer.data)
    else:
        message={'error':'otp is not valid'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


# total exp of service
@api_view(['POST'])
@authentication_classes([JWTAuthentications])
def total_giving_expense(request):
    user=request.user
    mobile=user.mobile
    print(mobile)
    job=JobVerification.objects.filter(mobile=mobile,job_end=True)
    print(job,'idddddddd')
    sum=0
    for i in job:
        print(i.order_number)
        exps=Job_Detail.objects.filter(ordernumber=i.order_number).exists()
        if exps:
            exp=Job_Detail.objects.get(ordernumber=i.order_number)
            print(exp,'expp')
            print(exp.rate)
            sum=sum+exp.rate  
    # serializer=JobVerificationSerializer(job,many=True)
    return Response({'count':sum})
  


# total revenuew of service
@api_view(['POST'])
@authentication_classes([JWTAuthentications])
def total_revenue(request):
    user=request.user
    job=Job_Detail.objects.filter(booked_person__email=user)
    sum=0
    for i in job:
        print(i.ordernumber)
        reve= JobVerification.objects.filter(order_number= i.ordernumber).exists()
        if reve:
            revenue= JobVerification.objects.get(order_number= i.ordernumber)
            if revenue.job_end:
                sum=sum+i.rate
                print(sum,'ddd')
    return Response({'count':sum})



# total completed services
@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def total_completed_task(request):
    user=request.user
    verify=Job_Detail.objects.filter(user=user,verified=True).exists()
    if verify:
        verify=Job_Detail.objects.filter(user=user,verified=True)
        serializer=JobSerializer(verify,many=True)
        return Response(serializer.data)
    elif Job_Detail.objects.filter(booked_person__email=user):
        verify=Job_Detail.objects.filter(booked_person__email=user)
        serializer=JobSerializer(verify,many=True)
        return Response(serializer.data)
    else:
        return Response({'error':'wow'})
    

                        