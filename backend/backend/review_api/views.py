from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View

from .models import Revision, Quiz, Question, Choice

from .serializers import RevisionSerializer, QuizSerializer, QuestionSerializer, ChoiceSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status

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
    serializer_class = RevisionSerializer
    permission_classes = [IsAuthenticated]
    queryset = Revision.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True) 
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return JsonResponse(serializer.data)

class QuizListView(generics.ListAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        revision_id = self.request.query_params.get('revision_id')
        return Quiz.objects.filter(revision_id=revision_id)


class QuizDeleteView(generics.DestroyAPIView):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Quiz.objects.filter(revision__user_id=self.request.user.id)

    def perform_destroy(self, instance):
        instance.delete()
        return JsonResponse({"msg": "Quiz deletado com sucesso!"})

class ValidateQuizView(APIView):
    def get(self, request, revision_id, quiz_id):
        try:
            revision = Revision.objects.get(pk=revision_id)
            quiz = Quiz.objects.get(pk=quiz_id, revision=revision)
            return JsonResponse({"msg": "Quiz válido!"}, status=status.HTTP_200_OK)
        except Quiz.DoesNotExist:
            return JsonResponse({"error": "Quiz não encontrado"}, status=status.HTTP_404_NOT_FOUND)


class QuestionListView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        quiz_id = self.kwargs.get('quiz_id')
        return Question.objects.filter(quiz_id=quiz_id)


class ChoiceListView(generics.ListAPIView):
    serializer_class = ChoiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        quiz_id = self.kwargs.get('quiz_id')
        questions = Question.objects.filter(quiz_id=quiz_id)
        choices = Choice.objects.filter(question__in=questions)
        return choices

    
