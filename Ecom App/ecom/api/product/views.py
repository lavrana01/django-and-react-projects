from django.shortcuts import render
from .models import product
from .serializers import productSerializer
from rest_framework import viewsets
# Create your views here.
class productViewSet(viewsets.ModelViewSet):
    queryset = product.objects.all().order_by('name')
    serializer_class = productSerializer
