from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def index(request):
    return Response({'message': 'Hello, world!'})

@api_view(['GET'])
def indexa(request):
    return Response({'message': 'AAAA'})