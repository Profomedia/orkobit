from rest_framework.routers import DefaultRouter

from .views import (
    HabitViewSet,
    HabitEntryViewSet,
)


router = DefaultRouter()

router.register(
    r"habits",
    HabitViewSet,
    basename="habits",
)

router.register(
    r"habit-entries",
    HabitEntryViewSet,
    basename="habit-entries",
)

urlpatterns = router.urls
