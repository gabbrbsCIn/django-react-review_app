from django.urls import path
from .views import GetReview, SaveQuiz, RevisionManagerView, RevisionDestroyView, RevisionUpdateView, QuizListView, QuizDeleteView, ValidateQuizView
from . import views

urlpatterns = [
    path("get-review", GetReview.as_view(), name="get_review"),
    path("save-quiz", SaveQuiz.as_view(), name="save_quiz"),
    path("revision", RevisionManagerView.as_view(), name="revision"),
    path("revision/<int:pk>", RevisionDestroyView.as_view(), name="delete_revision"),
    path("revision/update/<int:pk>", RevisionUpdateView.as_view(), name="update_revision"),
    path("quiz", QuizListView.as_view(), name="quiz"),
    path("quiz/<int:pk>", QuizDeleteView.as_view(), name="delete_quiz"),
    path("quiz/<int:revision_id>/<int:quiz_id>", ValidateQuizView.as_view(), name="validate_quiz")

]