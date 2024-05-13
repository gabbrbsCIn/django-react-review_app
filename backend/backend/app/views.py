from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class GetUserView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        username = request.user.username
        user_id = request.user.id
        return Response({"username": username, "user_id": user_id})