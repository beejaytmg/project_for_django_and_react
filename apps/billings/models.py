from django.db import models
from django.conf import settings

class Plan(models.Model):
    name = models.CharField(max_length=50, unique=True)  # Plan name (e.g., Basic, Premium)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price of the plan
    description = models.TextField(blank=True)  # Description of the plan

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Plan"
        verbose_name_plural = "Plans"
        ordering = ['name']

class Invoice(models.Model):
    tenant = models.ForeignKey('tenants.Tenant', on_delete=models.CASCADE, related_name='invoices')  # Associated tenant
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE, related_name='invoices')  # Plan associated with the invoice
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Invoice amount
    issued_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the invoice was issued
    due_date = models.DateTimeField()  # Due date for the payment
    status = models.CharField(max_length=20, choices=[('paid', 'Paid'), ('unpaid', 'Unpaid')], default='unpaid')  # Invoice status

    def __str__(self):
        return f"Invoice {self.id} - {self.tenant.name} - {self.status}"

    class Meta:
        verbose_name = "Invoice"
        verbose_name_plural = "Invoices"
        ordering = ['issued_at']
