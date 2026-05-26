from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class UserProfile(models.Model):
  user = models.OneToOneField(
      User, on_delete=models.CASCADE, related_name='profile')
  display_name = models.CharField(max_length=100, blank=True, null=True)
  bio = models.TextField(blank=True, null=True)
  profile_picture = models.ImageField(
      upload_to='profile_picture/', blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f"{self.user.username}'s profile"
