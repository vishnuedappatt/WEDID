from urllib import request
from django.shortcuts import render
from rest_framework import generics,viewsets
from rest_framework.decorators import APIView,api_view
from user.models import Account
from user.serializers import AccountSerializer
from user.authentication import JWTAuthentications
from jobportal.models import Job_Detail,JobVerification
from jobportal.serializer import JobVerificationSerializer,JobSerializer
from rentportal.models import Rent_detail
from rentportal.serializer import RentSerializer
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
    
    
    

