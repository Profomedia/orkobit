from rest_framework import serializers

from apps.momentum.models.quote_model import Quote


class QuoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Quote

        fields = [
            "id",
            "text",
            "author",
            "color",
            "is_favorite",
            "is_pinned",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]
