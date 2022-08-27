from dataclasses import fields
from xml.parsers.expat import model
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
        fields='__all__'
        