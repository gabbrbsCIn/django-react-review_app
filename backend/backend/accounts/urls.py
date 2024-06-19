from .views import CreateUserView, GetUserView
from django.urls import path

urlpatterns = [
    path('get_user/', GetUserView.as_view(), name='get_user'),
]
