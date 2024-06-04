from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View

from .models import Revision

from .serializers import RevisionSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.views import APIView

from . import utils

import json


class GetReview(APIView):
    def post(self, request):
        data = request.data
        quiz_dict = utils.generate_quiz(data.get('data'))
        return JsonResponse(quiz_dict)


class SaveQuiz(APIView):
    def post(self, request):
        data = request.data
        revision = request.data.get('revision')
        print(data.get('data'))
        quiz = data.get('data')
        quiz_saved = utils.save_quiz(quiz, request.user, revision)
        return JsonResponse({"msg": "Quiz salvo com sucesso!"})

        

class RevisionManagerView(generics.ListCreateAPIView):
    serializer_class = RevisionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Revision.objects.filter(user_id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)


class RevisionDestroyView(generics.DestroyAPIView):
    serializer_class = RevisionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Revision.objects.filter(user_id=self.request.user.id)

    def perform_destroy(self, instance):
        instance.delete()
        return JsonResponse({"msg": "Revisão deletada com sucesso!"})

class RevisionUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Revision.objects.all()
    serializer_class = RevisionSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True) 
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return JsonResponse(serializer.data)