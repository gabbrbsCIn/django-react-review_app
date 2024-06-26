from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View

from .models import Revision, Quiz, Question, Choice, QuizResult

from .serializers import RevisionSerializer, QuizSerializer, QuestionSerializer, ChoiceSerializer, QuizResultSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from . import utils

import json


class CreateAndSaveQuiz(APIView):
    def post(self, request):
        data = request.data
        quiz_dict = utils.generate_quiz(data.get('data'))
        revision = request.data.get('revision')
        quiz_saved = utils.save_quiz(quiz_dict, request.user, revision)
        return JsonResponse({"msg": "Quiz gerado e salvo com sucesso!"})
        

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

class LastQuizResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        last_result = QuizResult.objects.filter(user=user).order_by('-date_taken').first()
        if last_result:
            quiz = last_result.quiz
            serializer = QuizSerializer(quiz, context={'request': request})
            return Response(serializer.data)
        return Response({"msg": "Nenhum quiz encontrado!"})

class SaveQuizResultView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = QuizResultSerializer

    def create(self, request, *args, **kwargs):
        user = request.user
        quiz_id = request.data.get('quiz_id')
        score = request.data.get('score')

        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except Quiz.DoesNotExist:
            return JsonResponse({'error': 'Quiz não encontrado!'})

        quiz_result = QuizResult.objects.create(user=user, quiz=quiz, score=score)
        serializer = self.get_serializer(quiz_result)
        return JsonResponse(serializer.data)
