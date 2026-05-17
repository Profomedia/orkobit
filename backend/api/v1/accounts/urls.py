from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    CreateNewUserView,
    UserDetailView,
    UserProfileView,
    UserSettingsView,
    UserAccountView,
)

urlpatterns = [
    # Authentication
    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),

    path(
        "refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),

    path(
        "register/",
        CreateNewUserView.as_view(),
        name="register",
    ),

    # User
    path(
        "me/",
        UserAccountView.as_view(),
        name="user_account",
    ),

    path(
        "me/details/",
        UserDetailView.as_view(),
        name="user_details",
    ),

    path(
        "me/profile/",
        UserProfileView.as_view(),
        name="user_profile",
    ),

    path(
        "me/settings/",
        UserSettingsView.as_view(),
        name="user_settings",
    ),

    path(
        "api-auth/",
        include("rest_framework.urls"),
    ),
]
