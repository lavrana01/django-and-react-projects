from rest_framework import serializers
from .models import order,orderreturns

class orderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = order
        fields = ('user')


class orderreturnsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = orderreturns
        fields = ('return_product')

