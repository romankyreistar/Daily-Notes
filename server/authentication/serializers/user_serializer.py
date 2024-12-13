from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from authentication.models.custom_users import user_model
from authentication.models.users import User


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True, min_length=6)
    name = serializers.CharField(required=False, max_length=50)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            name=validated_data.get('name'),
            password=validated_data['password']
        )


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, min_length=6)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user_data = {}
        user_data = dict(email=email, password=password)

        user = user_model.authenticate(**user_data)
        if not user:
            raise serializers.ValidationError("Unable to log in with provided credentials.")

        # Token creation and updating last login
        refresh = RefreshToken.for_user(user)
        update_last_login(None, user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
