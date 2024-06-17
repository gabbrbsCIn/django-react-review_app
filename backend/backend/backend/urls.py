from django.contrib import admin
from django.urls import path, include
from accounts.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/user/register/', CreateUserView.as_view(), name='register'),
    path('app/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('app/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('app-auth/', include("rest_framework.urls")),
    path('', include("review_api.urls")),
    path('users/', include("accounts.urls")),
]
