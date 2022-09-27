from rest_framework import serializers
from .models import Order,OrderRent

class OrderSerializer(serializers.ModelSerializer):
    order_date = serializers.DateTimeField(format="%d %B %Y %I:%M %p")

    class Meta:
        model = Order
        fields = '__all__'
        depth = 2


class OrderRentSerializer(serializers.ModelSerializer):
    order_date = serializers.DateTimeField(format="%d %B %Y %I:%M %p")

    class Meta:
        model = OrderRent
        fields = '__all__'
        depth = 2
