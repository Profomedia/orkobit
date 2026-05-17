from django.contrib import admin

from apps.habit.models.habit import Habit
from apps.habit.models.habit_entry import HabitEntry


@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "habit_type",
        "target_value",
        "unit",
        "is_archived",
        "created_at",
    )

    list_filter = (
        "habit_type",
        "is_archived",
        "created_at",
    )

    search_fields = (
        "name",
        "description",
    )

    readonly_fields = (
        "uuid",
        "created_at",
        "updated_at",
    )

    ordering = ("-created_at",)

    fieldsets = (
        (
            "Core Information",
            {
                "fields": (
                    "uuid",
                    "name",
                    "description",
                    "habit_type",
                )
            },
        ),
        (
            "Tracking Configuration",
            {
                "fields": (
                    "target_value",
                    "unit",
                )
            },
        ),
        (
            "Appearance",
            {
                "fields": (
                    "color",
                    "icon",
                )
            },
        ),
        (
            "Status",
            {
                "fields": (
                    "is_archived",
                )
            },
        ),
        (
            "Timestamps",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )


@admin.register(HabitEntry)
class HabitEntryAdmin(admin.ModelAdmin):
    list_display = (
        "habit",
        "date",
        "completed",
        "value_number",
        "duration_seconds",
        "created_at",
    )

    list_filter = (
        "completed",
        "date",
        "created_at",
    )

    search_fields = (
        "habit__name",
    )

    readonly_fields = (
        "uuid",
        "created_at",
        "updated_at",
    )

    ordering = ("-date",)

    autocomplete_fields = ("habit",)

    fieldsets = (
        (
            "Entry Information",
            {
                "fields": (
                    "uuid",
                    "habit",
                    "date",
                    "completed",
                )
            },
        ),
        (
            "Tracked Values",
            {
                "fields": (
                    "value_number",
                    "value_boolean",
                    "value_text",
                    "duration_seconds",
                )
            },
        ),
        (
            "Timestamps",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )
