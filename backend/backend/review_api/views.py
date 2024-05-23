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
        print(data.get('data'))
        quiz_saved = utils.save_quiz(data.get('data'))
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
