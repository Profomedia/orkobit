from rest_framework import viewsets

from apps.momentum.models.quote_model import Quote
from apps.momentum.serializers.quote_serializer import QuoteSerializer


class QuoteViewSet(viewsets.ModelViewSet):

    queryset = Quote.objects.all()

    serializer_class = QuoteSerializer
