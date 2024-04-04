from django.contrib import admin
from django.urls import path, include
from app.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/user/register/', CreateUserView.as_view(), name='register'),
    path('app/toker/', TokenObtainPairView.as_view(), name='get_token'),
    path('app/toker/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('app-auth/', include("rest_framework.urls")),
]
