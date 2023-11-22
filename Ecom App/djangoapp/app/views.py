from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ReactSerializer
from .models import React
# Create your views here.

class ReactView(APIView):
    def get(self,request):
        output = [{"employee": ou.employee,
                   "department": ou.department}
                   for ou in React.objects.all()]
        return Response(output)
    
    def post(self,request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)