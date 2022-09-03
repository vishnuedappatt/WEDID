from rest_framework import exceptions
import jwt ,datetime
from rest_framework.authentication import BaseAuthentication,get_authorization_header
from .models import Account
from rest_framework.response import Response
from rest_framework  import status

def create_access_token(id):
    print('id is this ',id)
    user=Account.objects.get(id=id)
    print(user)
    print(user.email,'emaill')
    return jwt.encode({
        'user_id':id,
        'username':user.first_name,
        'email':user.email,
        'exp':datetime.datetime.utcnow()+datetime.timedelta(days=1),
        'iat':datetime.datetime.utcnow(),
        
    },'access_secret',algorithm='HS256')
    
    
def create_refresh_token(id):
    return jwt.encode({
        'user_id':id,
        'exp':datetime.datetime.utcnow()+datetime.timedelta(days=7),
        'iat':datetime.datetime.utcnow(),
        
    },'refresh_secret',algorithm='HS256')
    
def decode_access_token(token):
    try:
        payload=jwt.decode(token,'access_secret',algorithms='HS256')
        return payload['user_id']
        
    except Exception as e:
        print(e)
        raise exceptions.AuthenticationFailed('unauthenticateduuuu') 
    
    
def decode_refresh_token(token):
    try:
        print(token,'loll')
        print('enteredd')
        payload=jwt.decode(token,'refresh_secret',algorithms='HS256')
        print(payload,'payload')
        return payload['user_id']
        
    except Exception as e:
        print(e)
        response=Response()
        response.data={
            'message':'invalid credential'
        }
        return response
        raise exceptions.AuthenticationFailed('unauthenticated') 
    


class JWTAuthentications(BaseAuthentication):
    def authenticate(self,request):
        auth=get_authorization_header(request).split()
        print(len(auth))
            
        if auth and len(auth)==2:
            token=auth[1].decode('utf-8')
            print(token)            
            id=decode_access_token(token)
            print(id ,'id is thisss')
            user=Account.objects.get(id=id)
            print(user)           
            return (user,None)           
        raise exceptions.AuthenticationFailed('unauthenticatedjwt')
        
        
class ADMINAuth(BaseAuthentication):
    def authenticate(self,request):
        auth=get_authorization_header(request).split()
        print(len(auth))
            
        if auth and len(auth)==2:
            token=auth[1].decode('utf-8')
            print(token)            
            id=decode_access_token(token)
            user=Account.objects.get(id=id)
            if user.is_admin:
                print('adminn')                
                print(user)
                return (user,None)
            else:        
                print('getinnn')
                message={'detail':'no account presented'}
                return ()
                return Response(message,status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
                  
            #     # raise exceptions.AuthenticationFailed('unauthenticated')
            #     # message={'detail':'no account presented'}
            #     # return Response(message,status=status.HTTP_403_FORBIDDEN)
            #     response=Response()
            #     response.data={
            #         'message':'password miss match '
            #     }
            #     return Response()
        response=Response()
        response.data={
            'message':'password miss match '
        }
        return response    
        raise exceptions.AuthenticationFailed('unauthenticated')