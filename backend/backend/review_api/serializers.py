from rest_framework import serializers
from .models import Revision, Quiz, Question, Choice, QuizResult

class RevisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revision
        fields = ['id', 'title', 'text', 'user_id']
        read_only_fields = ['user_id']

class QuizSerializer(serializers.ModelSerializer):
    last_result = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'last_result', 'revision_id']

    def get_last_result(self, obj):
        user = self.context['request'].user
        last_result = QuizResult.objects.filter(user=user, quiz=obj).order_by('-date_taken').first()
        return QuizResultSerializer(last_result).data if last_result else None

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


class QuizResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizResult
        fields = ['score', 'date_taken']
