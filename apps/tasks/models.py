from django.db import models
from apps.tenants.models import Tenant
from apps.projects.models import Project
# Create your models here.
class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='tasks')  # Optional, if you want a direct relation to Tenant
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    due_date = models.DateField()
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name

    class Meta:
        ordering = ['due_date']