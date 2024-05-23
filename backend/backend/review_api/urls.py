from django.urls import path
from .views import GetReview, SaveQuiz, RevisionManagerView, RevisionDestroyView
from . import views

urlpatterns = [
    path("get-review", GetReview.as_view(), name="get_review"),
    path("save-quiz", SaveQuiz.as_view(), name="save_quiz"),
    path("revision", RevisionManagerView.as_view(), name="revision"),
    path("revision/<int:pk>", RevisionDestroyView.as_view(), name="delete_revision"),
]