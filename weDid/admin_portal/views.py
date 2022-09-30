from django.shortcuts import render
from rest_framework import generics,viewsets
from rest_framework.decorators import APIView,api_view
from user.models import Account
from user.serializers import AccountSerializer
from user.authentication import JWTAuthentications
from jobportal.models import Job_Detail,JobVerification,JobComplaint
from jobportal.serializer import JobVerificationSerializer,JobSerializer,JobComplaintSerializer
from rentportal.models import Rent_detail,RentComplaint
from rentportal.serializer import RentSerializer,RentComplaintSerializer
from rest_framework.response import Response
from rest_framework  import status
from payment.models import Order, OrderRent
from payment.serializers import OrderSerializer,OrderRentSerializer
# Create your views here.



class user_list(viewsets.ModelViewSet):
    authentication_classes=[JWTAuthentications]
    queryset=Account.objects.filter(is_admin=False).order_by('id')
    serializer_class=AccountSerializer
 
    
class job_list(viewsets.ModelViewSet):
    authentication_classes=[JWTAuthentications]    
    queryset=Job_Detail.objects.all().order_by('id')
    serializer_class=JobSerializer
    
    
class rent_list(viewsets.ModelViewSet):
    authentication_classes=[JWTAuthentications]
    queryset=Rent_detail.objects.all().order_by('id')
    serializer_class=RentSerializer
    

@api_view(['GET'])
def job_profit(request):
    job=Job_Detail.objects.filter(verified=True).exists()
    sum=0
    amounts=0
    if job:
        job=Job_Detail.objects.filter(verified=True)
        for i in job:
            if i.rate < 500:
                rate=i.rate
                value=round(rate *.05)           
                sum=sum+value                        
    
            else:
                rate=i.rate
                value=round(rate *.1)
                sum=sum+value
        buyer=Order.objects.filter(buyer=True)
        for i  in buyer:
            amount=i.order_amount
            amounts=amounts+int(amount)    
        totoal=sum+amounts
        return Response({'sum':sum,'amount':amounts,'total':totoal})
               
    else:
        message={ 'error':'there is no job   is  verified it'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
    
    
@api_view(['GET'])
def rent_profit(request):
    rent=OrderRent.objects.all()
    sum=0
    for i in rent:
        value=int(i.order_amount)
        sum=sum+value
    return Response({'sum':sum})
            
            
@api_view(["GET"])
def sales_graph(request):
    job=Job_Detail.objects.all().count()   
    booked=Job_Detail.objects.filter(booked=True).count()
    rent=Rent_detail.objects.all().count()
    rent_book=Rent_detail.objects.filter(booked=True).count()
    val=[
        {
            'name':'job',
            'type':job,
         'booked':booked
         },
        {   'name':'rent',
            'type':rent,
            'booked':rent_book,
        },
    ]
    return Response (val)


@api_view(['GET'])
def job_profit_list(request):
    job=Order.objects.filter(buyer=True)
    print(job)
    serializer=OrderSerializer(job,many=True)
    verify=Job_Detail.objects.filter(verified=True)
    givenz=[]
    for i in verify:
        print(i,'values')
        val=i.ordernumber
        print(val)
        bob=Order.objects.get(order_product=val,buyer=False)
        givenz.append(bob)
    print(givenz,'kkk')
    values=OrderSerializer(givenz,many=True)
    max={
        'buyer':serializer.data,
        'employer':values.data,
    }
    return Response(max)
     

@api_view(['GET'])
def rent_profit_list(request):
    rent=OrderRent.objects.all()
    serializer=OrderRentSerializer(rent,many=True)
    return Response(serializer.data)




@api_view(['GET'])
def all_complaint(request):
    rent=RentComplaint.objects.all()
    rent_se=RentComplaintSerializer(rent,many=True) 
    job=JobComplaint.objects.all()
    job_se=JobComplaintSerializer(job,many=True)
    max={
        'rent':rent_se.data,
        'job':job_se.data,
    }
    return Response(max)


class accepting_payment(viewsets.ModelViewSet):
    authentication_classes=[JWTAuthentications]
    queryset=JobVerification.objects.filter(job_end=False,end_verify=True)
    serializer_class=JobVerificationSerializer
