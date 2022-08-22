from rest_framework import exceptions
import jwt ,datetime
from rest_framework.authentication import BaseAuthentication,get_authorization_header
from .models import Account


def create_access_token(id):
    user=Account.objects.get(id=id)
    return jwt.encode({
        'user_id':id,
        'username':user.first_name,
        'email':user.email,
        'exp':datetime.datetime.utcnow()+datetime.timedelta(seconds=30),
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
        raise exceptions.AuthenticationFailed('unauthenticated') 
    
    
def decode_refresh_token(token):
    try:
        payload=jwt.decode(token,'refresh_secret',algorithms='HS256')
        return payload['user_id']
        
    except Exception as e:
        print(e)
        raise exceptions.AuthenticationFailed('unauthenticated') 
    


class JWTAuthentications(BaseAuthentication):
    def authenticate(self,request):
        auth=get_authorization_header(request).split()
        print(len(auth))
            
        if auth and len(auth)==2:
            token=auth[1].decode('utf-8')
            print(token)            
            id=decode_access_token(token)
            user=Account.objects.get(id=id)
            return (user,None)
           
        raise exceptions.AuthenticationFailed('unauthenticated')
        