from rest_framework import serializers
from . models import Rent_detail
from jobportal.serializer import CategorySerializer,CitySerializer,DistrictSerializer

class RentSerializer(serializers.ModelSerializer):
    category=CategorySerializer(many=False)
    district=DistrictSerializer(many=False)
    city=CitySerializer(many=False)
    class Meta:
        model=Rent_detail
        fields='__all__'