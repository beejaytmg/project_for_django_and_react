

from django.db import models
from django.contrib.auth.models import User
class Tenant(models.Model):
    name = models.CharField(max_length=150)  # Changed to CharField for proper text handling
    domain = models.CharField(max_length=255, unique=True)  # Domain or subdomain for the tenant
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tenants')  # Reference to the user who owns the tenant
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the tenant was created
    updated_at = models.DateTimeField(auto_now=True)  # Timestamp when the tenant was last updated
    is_active = models.BooleanField(default=True)  # Whether the tenant is active or not
    plan = models.CharField(max_length=50, choices=[('basic', 'Basic'), ('premium', 'Premium')])  # Subscription plan
    logo = models.ImageField(upload_to='tenants/logos/', null=True, blank=True)  # Optional logo for the tenant

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Tenant"
        verbose_name_plural = "Tenants"
        ordering = ['name']
