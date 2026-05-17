from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from apps.accounts.serializers import UserRegistrationSerializer, UserSettingsSerializer, CombinedUserSerializer, UserProfileSerializer
from django.contrib.auth.models import User
from .views import *
from apps.accounts.models import (
  user_settings,
  user_profile
)
# register user


class CreateNewUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserRegistrationSerializer
  pagination_class = [AllowAny]

# ---------------------------------------------------------------------------


class UserDetailView(generics.RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = UserRegistrationSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    # Return the user object for the currently authenticated user
    details = {"username": self.request.user.username,
               "email": self.request.user.email}
    return details
# ---------------------------------------------------------------------------


class UserSettingsView(generics.RetrieveUpdateAPIView):
  queryset = user_settings.UserSettings.objects.all()
  serializer_class = UserSettingsSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    # Return the user settings for the currently authenticated user
    return self.request.user.settings

  def perform_update(self, serializer):
    # Save the updated settings
    serializer.save(user=self.request.user)

# ---------------------------------------------------------------------------


class UserProfileView(generics.RetrieveUpdateAPIView):
  queryset = user_profile.UserProfile.objects.all()
  serializer_class = UserProfileSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    # Return the user profile for the currently authenticated user
    return self.request.user.profile

  def perform_update(self, serializer):
    #  Save the updated profile
    serializer.save(user=self.request.user)

# ---------------------------------------------------------------------------


class UserAccountView(generics.RetrieveUpdateAPIView):
  serializer_class = CombinedUserSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    return self.request.user
