from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from authentication.views import UserRegistration, UserLogin

urlpatterns = [
    path('signup/', UserRegistration.as_view(), name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
