from rest_framework import serializers
from . models import Rent_detail

class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Rent_detail
        fields='__all__'