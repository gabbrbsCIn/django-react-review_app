from django.urls import path
from .views import GetReview
from . import views

urlpatterns = [
    path("get-review", GetReview.as_view(), name="get_review"),
]