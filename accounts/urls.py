from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_login, name='login'), # Default route (root)
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.user_signup, name='register'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('delete/<int:pk>/', views.delete_leetcode_user, name='delete_leetcode_user'),


]
