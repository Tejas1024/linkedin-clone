from django.urls import path
from . import views

urlpatterns = [
    path('', views.PostListCreateView.as_view(), name='post_list_create'),
    path('user/<str:username>/', views.UserPostsView.as_view(), name='user_posts'),
]