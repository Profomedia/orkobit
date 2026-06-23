from rest_framework.routers import DefaultRouter

from .quote_view import QuoteViewSet


router = DefaultRouter()

router.register(
    "",
    QuoteViewSet,
    basename="quote",
)

urlpatterns = router.urls
