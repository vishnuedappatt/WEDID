from rest_framework import serializers
from user.models import Account, Categories,District,City
from user.serializers import AccountSerializer
from .models import Job_Detail, JobVerification


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
    user=AccountSerializer(many=False)
    category=CategorySerializer(many=False)
    city=CitySerializer(many=False)
    district=DistrictSerializer(many=False)
    booked_person=AccountSerializer(many=False)
    class Meta :
        model=Job_Detail
        fields="__all__"

class EditJobSerializer(serializers.ModelSerializer):
    class Meta:
        model=Job_Detail
        fields=['title','category','district','city','discriptions','sub_mobile','address','place','rate']
        

        
        
class JobHistorySerializer(serializers.ModelSerializer):
    category=CategorySerializer(many=False)
    city=CitySerializer(many=False)
    district=DistrictSerializer(many=False)
    user=AccountSerializer(many=False)
    booked_person=AccountSerializer(many=False)
    
    class Meta :
        model=Job_Detail
        fields="__all__"
        
        
class JobVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=JobVerification
        fields='__all__'