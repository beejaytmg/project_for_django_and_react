from rest_framework.response import Response 
from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Tenant
from .serializers import TenantSerializer, TenantCreateSerializer
class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    permission_classes = [IsAuthenticated]
class UserTenantsListView(generics.ListAPIView):
    serializer_class = TenantSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Use the authenticated user's ID
        user = self.request.user
        return Tenant.objects.filter(owner=user)
class TenantCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = TenantCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)