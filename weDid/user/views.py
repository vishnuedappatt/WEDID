from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes

from .models import Account
from .serializers import AccountSerializer,VerificationSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework  import status
from django.contrib.auth.hashers import make_password
from .verify import send,check

# Create your views here.


@api_view(['POST'])
def Register(request):
    print(request.data)
    try:
        data=request.data
        password=data['password']
        confirm_password=data['confirm_password']
        if password==confirm_password:
            userpassword=password
            print(userpassword)
        else:
            message={'detail':'password miss match'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
            
        user=Account.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            mobile=data['mobile'],            
            password=make_password(userpassword)
                
    )   
        mobile=data['mobile']
        request.session['phone_number']=mobile
        send(mobile)
        print(mobile)
        serializer=AccountSerializer(user ,many=False)
        return Response(serializer.data)
    except:
        message={'detail':'user with this email already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
    
    
# @api_view(['POST'])
# def verification(request):
#     try:
#         data=request.data
#         mobile=request.session['phone_number']
#         print(mobile,'second')
#         code=data['code']
#         print(code)
#         if check(mobile,code):
#             print('wehrer')
#             user=Account.objects.get(mobile=mobile)
#             print('hoiojio')            
#             verified=VerificationSerializer(instance=user, data=request.data)
#             print('whennn')
#             if verified.is_valid():
#                 print('adaaaaaaaa')
#                 verified.save()
#             else:
#                 print('error')
#             return Response(verified.data)
            
            
#         else:
#             message={'detail':'otp is not currect'}
#             return Response(message,status=status.HTTP_400_BAD_REQUEST)
#     except:
#         message={'detail':'error in serializer'}
#         return Response(message,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def verification(request):
    try:
        data=request.data
        mobile=request.session['phone_number']
        print(mobile,'second')
        code=data['code']
        print(code)
        if check(mobile,code):      
            user=Account.objects.get(mobile=mobile)
            print(user.is_active)
            user.is_active=True
            user.save()
            serializer=VerificationSerializer(user,many=False)
            return Response(serializer.data)
        else:
            message={'detail':'otp is not valid'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
       
        
    except:
        message={'detail':'error in serializer'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)