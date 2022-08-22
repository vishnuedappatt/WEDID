
import datetime
from lib2to3.pgen2 import token
from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes,authentication_classes

from .models import Account,UserToken
from .serializers import AccountSerializer,VerificationSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework  import status
from django.contrib.auth.hashers import make_password
from .verify import send,check
from . authentication import JWTAuthentications, create_access_token,create_refresh_token,decode_access_token,decode_refresh_token
from rest_framework import exceptions
from rest_framework.authentication import get_authorization_header
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage



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
            serializer=AccountSerializer(user,many=False)
            return Response(serializer.data)
        else:
            message={'detail':'otp is not valid'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
       
        
    except:
        message={'detail':'error in serializer'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
    
    
@api_view(['POST'])
def Login(request):
    data=request.data
    email=data['email']
    password=data['password']
    user=Account.objects.filter(email=email).first()
    print('wow')
    if user is None:
        raise exceptions.AuthenticationFailed('invalid credentials ')
    
    if not user.check_password(password):
        raise exceptions.AuthenticationFailed('password miss match')
    
    
    
    access_token=create_access_token(user.id)
    refresh_token=create_refresh_token(user.id)
    print(user.id)
    UserToken.objects.create(
        user_id=user.id,
        token=refresh_token,
        expired_at=datetime.datetime.utcnow()+datetime.timedelta(days=7)
        )
    
    
    response=Response()
    response.set_cookie(key='refresh_token',value=refresh_token,httponly=True)
    response.data={
        'token':access_token,
        'refresh':refresh_token,
        'id':user.id,
        'first_name':user.first_name,
        'last_name':user.last_name,
        'email':user.email,
        'password':user.password,
    }
    # serializer=AccountSerializer(user,many=False)
    # return Response(serializer.data)
    return response



@api_view(['GET'])
# @permission_classes([IsAuthenticated])
# authentication_classes=[JWTAuthentications]
# @permission_classes([JWTAuthentications])
@authentication_classes([JWTAuthentications])
def alluser(request):
    user=Account.objects.all()
    serializer=AccountSerializer(user,many=True)    
    return Response(serializer.data)



@api_view(['POST'])
def refresh(request):
    print('wooe')
    refresh_token=request.COOKIES.get('refresh_token')
    id=decode_refresh_token(refresh_token)
    if not UserToken.objects.filter(
        user_id=id,
        token=refresh_token,
        expired_at__gt=datetime.datetime.now(tz=datetime.timezone.utc)
    ).exists():
        raise exceptions.AuthenticationFailed('unauthenticate')
    
    access_token=create_access_token(id)
    return Response({
        'token':access_token,
    })
    
    
    
@api_view(['POST'])
# @authentication_classes([JWTAuthentications])
def Logout(request):
    refresh_token=request.COOKIES.get('refresh_token')
    # UserToken.objects.filter(user_id=request.user.id).delete()
    UserToken.objects.filter(token=refresh_token).delete()
    response=Response()
    response.delete_cookie(key='refresh_token')
    response.data={
        'message':'successfully logout'
    }
    return response



@api_view(['POST'])
def forgotpassword(request):
    data=request.data
    email=data['email']
    print(email)
    user=Account.objects.filter(email=email).exists()
    if user:
        print('enteredddd')
    message={'detail':'email sented to  {email}'}
    return Response(message,status=status.HTTP_200_OK)