from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserSettings
from django.contrib.auth import get_user_model
from .models import UserProfile
from django.db.models.signals import post_migrate
import os
User = get_user_model()

@receiver(post_save, sender=User)
def create_user_settings(sender, instance, created, **kwargs):
  if created:
    UserSettings.objects.create(user=instance)
    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    UserProfile.objects.create(user=instance)
    
@receiver(post_migrate)
def create_superuser(sender, **kwargs):
  User = get_user_model()
  
  username = os.getenv("DJANGO_SUPERUSER_USERNAME")
  email = os.getenv("DJANGO_SUPERUSER_EMAIL")
  password = os.getenv("DJANGO_SUPERUSER_PASSWORD")
  
  if not username or not password:
    return
  
  if not User.objects.filter(username=username).exists():
    print("🚀 Creating superuser...")
    User.objects.create_superuser(
        username=username,
        email=email,
        password=password
    )
