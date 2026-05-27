from django.contrib import admin

from apps.habit.models.habit import Habit
from apps.habit.models.habit_entry import HabitEntry


@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "habit_type",
        "frequency_type",
        "target_value",
        "unit",
        "is_archived",
        "position",
        "created_at",
    )

    list_filter = (
        "habit_type",
        "frequency_type",
        "is_archived",
        "created_at",
    )

    search_fields = (
        "name",
        "description",
    )

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
    )

    ordering = (
        "position",
        "-created_at",
    )

    fieldsets = (

        (
            "Core Information",
            {
                "fields": (
                    "id",
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
                    "frequency_type",
                    "weekly_target",
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
            "Organization",
            {
                "fields": (
                    "position",
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
        "is_completed",
        "value_boolean",
        "value_number",
        "duration_seconds",
        "created_at",
    )

    list_filter = (
        "date",
        "created_at",
    )

    search_fields = (
        "habit__name",
        "notes",
    )

    readonly_fields = (
        "id",
        "is_completed",
        "created_at",
        "updated_at",
    )

    ordering = (
        "-date",
    )

    autocomplete_fields = (
        "habit",
    )

    fieldsets = (

        (
            "Entry Information",
            {
                "fields": (
                    "id",
                    "habit",
                    "date",
                    "is_completed",
                )
            },
        ),

        (
            "Tracked Values",
            {
                "fields": (
                    "value_boolean",
                    "value_number",
                    "value_text",
                    "duration_seconds",
                    "notes",
                )
            },
        ),

        (
            "Organization",
            {
                "fields": (
                    "position",
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
