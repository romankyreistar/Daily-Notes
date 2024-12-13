from authentication.models import User
from rest_framework.authentication import BaseAuthentication


class UserAuthentication(BaseAuthentication):
    def authenticate(self, email=None, password=None, **kwargs):

        if email is None:
            return None
        else:
            try:
                user = User.objects.get(email=email)

            except User.DoesNotExist:
                return None

        if user.check_password(password):
            return user

    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None


user_model = UserAuthentication()
