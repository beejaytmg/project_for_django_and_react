from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TenantViewSet, TenantCreateAPIView

router = DefaultRouter()
router.register(r'tenant', TenantViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('tenant/create', TenantCreateAPIView.as_view(), name='create_tenant')
]
