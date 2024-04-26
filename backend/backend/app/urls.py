from .views import CreateUserView, GetUsernameView
from django.urls import path

urlpatterns = [
    path('get_username/', GetUsernameView.as_view(), name='get_username'),
]
