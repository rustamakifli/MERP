from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Event(models.Model):
    title = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)
    
    def __str__(self):
        return self.title
    
    def can_cancel(self):
        duration = (self.end_date - self.start_date).days
        return duration <= 2 and (self.start_date - timezone.now()).days >= 2

class Registration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    reservation_code = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.event}"
