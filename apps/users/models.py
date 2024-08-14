from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.contrib.auth.models import User
from apps.tenants.models import Tenant
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    tenants = models.ManyToManyField(Tenant, blank=True, related_name='users')

    def __str__(self):
        return self.user.username