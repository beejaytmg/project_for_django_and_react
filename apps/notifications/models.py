from django.db import models
from apps.users.models import User

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')  # User receiving the notification
    message = models.TextField()  # Notification message
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the notification was created
    is_read = models.BooleanField(default=False)  # Whether the notification has been read

    def __str__(self):
        return f"Notification for {self.user.username} - {self.created_at}"

    class Meta:
        verbose_name = "Notification"
        verbose_name_plural = "Notifications"
        ordering = ['-created_at']
