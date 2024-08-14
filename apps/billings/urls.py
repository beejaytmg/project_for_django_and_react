from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlanViewSet, InvoiceViewSet

router = DefaultRouter()
router.register(r'plans', PlanViewSet)
router.register(r'invoices', InvoiceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
