from django.urls import path
from .views import GetReview, SaveQuiz, RevisionManager
from . import views

urlpatterns = [
    path("get-review", GetReview.as_view(), name="get_review"),
    path("save-quiz", SaveQuiz.as_view(), name="save_quiz"),
    path("add-revision", RevisionManager.as_view(), name="add_revision"),
]