from rest_framework import serializers
from .models import product

class productSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(max_length=None, allow_empty_file=False,allow_null=True,required=True)
    class Meta:
        model = product
        fields = ('id','name','description','price','image','category')