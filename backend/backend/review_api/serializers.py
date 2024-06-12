from rest_framework import serializers
from .models import Revision, Quiz, Question, Choice

class RevisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revision
        fields = ['id', 'title', 'text', 'user_id']
        read_only_fields = ['user_id']

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'revision_id']
        read_only_fields = ['revision_id']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text', 'quiz_id']
        read_only_fields = []

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text', 'is_correct', 'question_id']
        read_only_fields = []
