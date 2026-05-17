from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserSettings, UserProfile
from django.templatetags.static import static

# user registration ---------------------------------------------------------------


class UserRegistrationSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)

  class Meta:
    model = User
    verbose_name = 'UserRegistration'
    verbose_name_plural = 'UserRegistrations'
    fields = ['username', 'email', 'password']

  def create(self, validated_data):
    user = User(
        username=validated_data['username'],
        email=validated_data['email']
    )
    user.set_password(validated_data['password'])
    user.save()
    return user

# ---------------------------------------------------------------------------------


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['username']

# ---------------------------------------------------------------------------------


class UserSettingsSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserSettings
    fields = '__all__'
    read_only_fields = ['user', 'updated_at']


# ---------------------------------------------------------------------------------

class UserProfileSerializer(serializers.ModelSerializer):
  profile_picture_url = serializers.SerializerMethodField()

  class Meta:
    model = UserProfile
    fields = '__all__'
    read_only_fields = ['user', 'created_at', 'updated_at',
                        'display_name', 'bio', 'profile_picture_url']

  def get_profile_picture_url(self, obj):
    request = self.context.get('request')
    if obj.profile_picture:
      url = obj.profile_picture.url
    else:
      url = static('/images/default_user_avatar.png')

    if request is not None:
      return request.build_absolute_uri(url)
    return url

  def update(self, instance, validated_data):
    # update the profile picture if provided
    for attr, value in validated_data.items():
      setattr(instance, attr, value)

    instance.save()
    return instance
# ---------------------------------------------------------------------------------


class CombinedUserSerializer(serializers.ModelSerializer):
  profile = UserProfileSerializer()
  settings = UserSettingsSerializer()

  class Meta:
    model = User
    fields = ['username', 'email', 'profile', 'settings']

  def update(self, instance, validated_data):
    profile_data = validated_data.pop('profile', {})
    settings_data = validated_data.pop('settings', {})

    # Update base User
    for attr, value in validated_data.items():
      setattr(instance, attr, value)
    instance.save()

    # Update UserProfile
    profile, _ = UserProfile.objects.get_or_create(user=instance)
    for attr, value in profile_data.items():
      setattr(profile, attr, value)
    profile.save()

    # Update UserSettings
    settings, _ = UserSettings.objects.get_or_create(user=instance)
    for attr, value in settings_data.items():
      setattr(settings, attr, value)
    settings.save()

    return instance
