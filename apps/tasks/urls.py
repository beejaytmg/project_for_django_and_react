from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, TaskCreateAPIView



urlpatterns = [
    path('user/tenant/task', TaskViewSet.as_view(), name='tenant_task'),
    path('task/create', TaskCreateAPIView.as_view(), name='create_task')
]
