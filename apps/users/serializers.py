from .models import User
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, max_length=150)
    password = serializers.CharField(required=True, style={'input_type': 'password'})
    def validate(self, data):
        try:
            user = User.objects.get(username=data.get('username'))
            if user.check_password(data.get('password')):
                return {'user': user}
        except ObjectDoesNotExist:
            raise serializers.ValidationError("Invalid credentials")
