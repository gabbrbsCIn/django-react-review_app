# urls.py

from django.urls import path
from .views import (
    GetReview, SaveQuiz, RevisionManagerView, RevisionDestroyView, RevisionUpdateView,
    QuizListView, QuizDeleteView, ValidateQuizView, QuestionListView, ChoiceListView,
    LastQuizResultView, SaveQuizResultView
)

urlpatterns = [
    path("get-review", GetReview.as_view(), name="get_review"),
    path("save-quiz", SaveQuiz.as_view(), name="save_quiz"),

    path("revision", RevisionManagerView.as_view(), name="revision"),
    path("revision/<int:pk>", RevisionDestroyView.as_view(), name="delete_revision"),
    path("revision/update/<int:pk>", RevisionUpdateView.as_view(), name="update_revision"),

    path("quiz", QuizListView.as_view(), name="quiz"),
    path("quiz/<int:pk>", QuizDeleteView.as_view(), name="delete_quiz"),
    path("quiz/<int:revision_id>/<int:quiz_id>", ValidateQuizView.as_view(), name="validate_quiz"),
    path("questions/<int:quiz_id>", QuestionListView.as_view(), name="question"),
    path("choices/<int:quiz_id>", ChoiceListView.as_view(), name="choice"),
    
    path('last-quiz-result/', LastQuizResultView.as_view(), name='last-quiz-result'),
    path('quiz-results/', SaveQuizResultView.as_view(), name='save-quiz-result'),
]
