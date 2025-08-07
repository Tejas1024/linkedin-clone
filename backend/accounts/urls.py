# backend/accounts/urls.py

from django.urls import path
from .views import RegisterView, LoginView, LogoutView, CurrentUserView, UserProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    # CHANGED: Point the logout URL to your new LogoutView
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', CurrentUserView.as_view(), name='me'),
    path('profile/<str:username>/', UserProfileView.as_view(), name='profile'),
]
