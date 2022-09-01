from rest_framework import serializers
from user.models import Categories,District,City
from .models import JobPortal


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Categories
        fields='__all__'
  
        
class DistrictSerializer(serializers.ModelSerializer):
    class Meta :
        model=District
        fields='__all__'
  
        
class CitySerializer(serializers.ModelSerializer):
    class Meta :
        model=City
        fields='__all__'


class JobSerializer(serializers.ModelSerializer):
    class Meta :
        model=JobPortal
        fields="__all__"

class EditJobSerializer(serializers.ModelSerializer):
    class Meta:
        model=JobPortal
        fields=['title','category','district','city','discriptions','sub_mobile','address','place','rate']
        
        
