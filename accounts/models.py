# accounts/models.py

from django.db import models
from django.contrib.auth.models import User

class LeetCodeData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    easy = models.IntegerField(default=0)
    medium = models.IntegerField(default=0)
    hard = models.IntegerField(default=0)
    total = models.IntegerField(default=0)
    rating = models.CharField(max_length=100, default='--')
    top_percentage = models.CharField(max_length=100, default='--')
    # last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'username') 

    def __str__(self):
        return f'{self.username} ({self.user.username})'
