from rest_framework import serializers
from .models import Tenant
from apps.users.models import User
class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields ='__all__'
class TenantCreateSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(write_only=True) 
    class Meta:
        model = Tenant
        fields = ['id', 'name', 'domain', 'owner_username', 'plan', 'logo', 'created_at', 'updated_at', 'is_active']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_active']
    def validate_owner_username(self, value):
        # Ensure that the user with the given username exists in the custom User model
        if not User.objects.filter(username=value).exists():
            raise serializers.ValidationError("User with this username does not exist.")
        return value

    def create(self, validated_data):
        username = validated_data.pop('owner_username')  # Extract the username
        owner = User.objects.get(username=username)  # Get the User instance from the custom User model
        tenant = Tenant.objects.create(owner=owner, **validated_data)  # Create the tenant
        return tenant