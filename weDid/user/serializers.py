from dataclasses import field, fields
from .models import Account, Categories,UPIDetails,BankDetails
from rest_framework import serializers


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields=['first_name','last_name','mobile','email','password','is_active','is_admin','is_staff','count','id']
        
        
# class VerificationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Account
#         fields=['is_active']
        
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Categories
        fields='__all__'
        

class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model=BankDetails
        fields='__all__'
        
        
class UpiSerializer(serializers.ModelSerializer):
    class Meta:
        model=UPIDetails
        fields='__all__'