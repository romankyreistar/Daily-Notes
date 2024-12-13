from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email or not password:
            raise ValueError('The email and password must be set')
        return self.create(password=make_password(password), email=self.normalize_email(email), **kwargs)

    def get_user_by_email(self, email):
        return self.filter(email=email, is_active=True).last()

    def reset_password(self, email, password):
        user = self.get_user_by_email(email)
        if user:
            user.set_password(password)
            user.save()


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=50, null=True)
    email = models.EmailField(_('email address'), unique=True, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    objects = UserManager()

    def __str__(self):
        return f"{self.name}===>{self.email}"

