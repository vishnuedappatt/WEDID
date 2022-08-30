
import datetime
import re
from unicodedata import category
from django.shortcuts import render,redirect
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from .models import Account,UserToken,Categories,City,District
from .serializers import AccountSerializer,CategorySerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework  import status
from django.contrib.auth.hashers import make_password
from .verify import send,check
from . authentication import ADMINAuth, JWTAuthentications, create_access_token,create_refresh_token,decode_access_token,decode_refresh_token
from rest_framework import exceptions
from rest_framework.authentication import get_authorization_header
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.contrib import auth


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
            response=Response()
            response.data={
            'error':'password miss match'
            }
            return response
       
        mobile=data['mobile']
        email=data['email']
        anonymous=Account.objects.filter(email=email).exists()
        if anonymous:
            response=Response()
            response.data={
            'error':'this mobile email is already taken choose another one'
            }
            return response
        anonymous=Account.objects.filter(mobile=mobile).exists()
        if anonymous:
            response=Response()
            response.data={
            'error':'this mobile number is already taken choose another one'
            }
            return response
     
        
        user=Account.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            mobile=data['mobile'],            
            password=make_password(userpassword)
                
    )   
        mobile=data['mobile']        
        send(mobile)        
        serializer=AccountSerializer(user ,many=False)
        return Response(serializer.data)
    except:
        response=Response()
        response.data={
            'error':'user with this email already exists'
        }
        return response
        # message={'detail':'user with this email already exists'}
        # return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
    
  

@api_view(['POST'])
def verification(request):   
    print('enter')  
    data=request.data 
    code=data['code']
    mobile=data['mobile']
    # mobile=request.session['phone_number']
    print(mobile,'second')
    
    print(code)
    if check(mobile,code):      
        user=Account.objects.get(mobile=mobile)
        print(user.is_active)
        user.is_active=True
        email=user.email
        user.save()
        current_site = get_current_site(request)
        mail_subject ='Welcome Tag'
        message= render_to_string('user/welcome.html',{
                'user':user,
                'domain': current_site,
                'uid':urlsafe_base64_encode(force_bytes(user.id)),
                'token':default_token_generator.make_token(user),

                    })
        to_email = email
        send_email=EmailMessage(mail_subject, message ,to=[to_email])
        print("here")
        send_email.send()
        
        serializer=AccountSerializer(user,many=False)
        return Response(serializer.data)
    else:
        response=Response()
        response.data={
            'error':'invalid otp !! give currect otp'
        }
        return response
        message={'detail':'otp is not valid'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
       
        
   
        response=Response()
        response.data={
            'otperror':' error found'
        }
        return response
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
        response=Response()
        response.data={
            'message':'invalid credential'
        }
        return response
      
       
    if not user.check_password(password):
        response=Response()
        response.data={
            'message':'password miss match '
        }
        return response  
    
    
    user_verified=auth.authenticate(email=email,password=password)
    if user_verified:
        
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
            'count':user.count,
        }
        # serializer=AccountSerializer(user,many=False)
        # return Response(serializer.data)
        return response
    else:
        response=Response()
        response.data={
            'message':'authtification fail failed '
        }
        return response  
        



@api_view(['GET'])
@authentication_classes([JWTAuthentications])
# @authentication_classes([ADMINAuth])
def alluser(request):
    user=Account.objects.all()
    serializer=AccountSerializer(user,many=True)    
    return Response(serializer.data)



@api_view(['POST'])
def refresh(request):
    print('wooe')
    data=request.data
    refresh=data['refresh']
    # refresh_token=request.COOKIES.get('refresh_token')
    id=decode_refresh_token(refresh)
    if not UserToken.objects.filter(
        user_id=id,
        token=refresh,
        expired_at__gt=datetime.datetime.now(tz=datetime.timezone.utc)
    ).exists():
        response=Response()
        response.data={
            'message':'error'
        }
        return response
        raise exceptions.AuthenticationFailed('unauthenticate')
    
    access_token=create_access_token(id)
    return Response({
        'token':access_token,
    })
    
    
    
@api_view(['POST'])
# @authentication_classes([JWTAuthentications])
def Logout(request):
    print('heuuuu')
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
        user=Account.objects.get(email__exact=email)
        print(user)
        current_site = get_current_site(request)
        mail_subject ='Reset password'
        message= render_to_string('user/forgot_password_email.html',{
                'user':user,
                'domain': current_site,
                'uid':urlsafe_base64_encode(force_bytes(user.id)),
                'token':default_token_generator.make_token(user),

                    })
        to_email = email
        send_email=EmailMessage(mail_subject, message ,to=[to_email])
        print("here")
        send_email.send()
        message={'success':'email sented to your email'}
        return Response(message,status=status.HTTP_200_OK)
    else:
        response=Response()
        response.data={
            'error':'No account assosiate with this email'
        }
        return response
     
    

def resetpassword_validate(request,uidb64,token):
    if request.method=="POST":
        try:
            print('get in ittt')
            uid=urlsafe_base64_decode(uidb64).decode()
            user =Account._default_manager.get(pk=uid)
        except(TypeError,ValueError,OverflowError,Account.DoesNotExist):
            user=None
        if user is not None and default_token_generator.check_token(user,token): 
            print(uid)
        data=request.POST
        password =data['password']
        confirm_password =data['confirm_password']      
        uid=urlsafe_base64_decode(uidb64).decode()
        print(uid)
        if password == confirm_password:          
            print(uid)
            user=Account.objects.get(pk=uid)
            user.set_password(password)
            user.save()
            return render(request,'user/success.html')
           
        
        else:
            message={'detail':'no account presented'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
    else:
        return render(request,'user/reset_password.html')
    
    
@api_view(['POST'])
def resetPassword(request):
    data=request.data
    password =data['password']
    confirm_password =data['confirm_password']

    if password == confirm_password:
        uid =request.session.get('uid')
        print(uid)
        user=Account.objects.get(pk=uid)
        user.set_password(password)
        user.save()
        message={'success':'password reset successfully'}
        return Response(message,status=status.HTTP_200_OK)

    else:
        message={'error':'password missmatch'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)



    
@api_view(['GET'])
@authentication_classes([JWTAuthentications])
def userdata(request):
    print('ethiiittttp')
    user=request.user
    print(user,'fgdgfgs')
    data=Account.objects.get(email=user)
    serializer=AccountSerializer(data,many=False)
    return Response(serializer.data)