from django.contrib import admin
from apps.momentum.models.quote_model import Quote


@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):

    list_display = (
        "short_text",
        "author",
        "is_favorite",
        "is_pinned",
        "created_at",
    )

    list_filter = (
        "is_favorite",
        "is_pinned",
        "created_at",
    )

    search_fields = (
        "text",
        "author",
    )

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
    )

    ordering = (
        "-created_at",
    )

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "text",
                    "author",
                    "color",
                ),
            },
        ),
        (
            "State",
            {
                "fields": (
                    "is_favorite",
                    "is_pinned",
                ),
            },
        ),
        (
            "Metadata",
            {
                "fields": (
                    "id",
                    "created_at",
                    "updated_at",
                ),
            },
        ),
    )

    @admin.display(description="Quote")
    def short_text(self, obj):
        return (
            obj.text[:75] + "..."
            if len(obj.text) > 75
            else obj.text
        )
