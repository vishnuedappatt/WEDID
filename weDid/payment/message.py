        # Download the helper library from https://www.twilio.com/docs/python/install
# import os
# from twilio.rest import Client
# from django.conf import settings

# def Message_service(mobile,messages): 
#     print('jookk')
#     print(mobile)
#     print('ok')
#     account_sid =settings.TWILIO_ACCOUNT_SID
#     auth_token =settings.TWILIO_AUTH_TOKEN
#     client = Client(account_sid, auth_token) 
    
#     message = client.messages.create(  
#                                 # messaging_service_sid='MGe9e6e82c7fa7eb9a5b355e77d7acb99c', 
#                                 from_='+19894399944',
#                                 body=messages,      
#                                 to=str('+91')+mobile,
#                             ) 
    
#     print(message.sid)
#     print(message.sid,'messagaes')
     
import urllib.request
import urllib.parse
 
def sendSMS(apikey, numbers, sender, message):
    data =  urllib.parse.urlencode({'apikey': apikey, 'numbers': numbers,
        'message' : message, 'sender': sender})
    data = data.encode('utf-8')
    request = urllib.request.Request("https://api.textlocal.in/send/?")
    f = urllib.request.urlopen(request, data)
    fr = f.read()
    return(fr)
 
resp =  sendSMS('apikey', '918123456789',
    'Jims Autos', 'This is your message')
print (resp)