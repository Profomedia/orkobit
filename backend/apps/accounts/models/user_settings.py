from django.db import models
from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class UserSettings(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='settings')
  quote_pack = models.TextField(default='warrior')
  show_quotes = models.BooleanField(default=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f"{self.user.username}'s settings"
