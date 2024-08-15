from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ProjectCreateAPIView



urlpatterns = [
    path('user/tenant/project', ProjectViewSet.as_view(), name='project-tenant'),
    path('project/create', ProjectCreateAPIView.as_view(), name='create-project')
]
