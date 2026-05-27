import uuid

from django.core.exceptions import ValidationError
from django.db import models


class Habit(models.Model):

    HABIT_TYPES = [
        ("boolean", "Boolean"),
        ("number", "Number"),
        ("timer", "Timer"),
        ("rating", "Rating"),
    ]

    FREQUENCY_TYPES = [
        ("daily", "Daily"),
        ("weekly_count", "Weekly Count"),
    ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    name = models.CharField(
        max_length=255,
    )

    description = models.TextField(
        blank=True,
        null=True,
    )

    habit_type = models.CharField(
        max_length=20,
        choices=HABIT_TYPES,
        default="boolean",
        db_index=True,
    )

    target_value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=1,
    )

    unit = models.CharField(
        max_length=50,
        blank=True,
        null=True,
    )

    color = models.CharField(
        max_length=20,
        default="#7c5cff",
    )

    icon = models.CharField(
        max_length=50,
        blank=True,
        null=True,
    )

    is_archived = models.BooleanField(
        default=False,
        db_index=True,
    )

    frequency_type = models.CharField(
        max_length=20,
        choices=FREQUENCY_TYPES,
        default="daily",
        db_index=True,
    )

    weekly_target = models.PositiveIntegerField(
        blank=True,
        null=True,
    )

    position = models.PositiveIntegerField(
        default=0,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:

        ordering = ["position", "-created_at"]

        indexes = [
            models.Index(
                fields=["habit_type"],
            ),

            models.Index(
                fields=["frequency_type"],
            ),

            models.Index(
                fields=["is_archived"],
            ),

            models.Index(
                fields=["position"],
            ),
        ]

        constraints = [

            models.CheckConstraint(
                condition=models.Q(
                    target_value__gte=0,
                ),
                name="habit_target_value_gte_0",
            ),

            models.CheckConstraint(
                condition=models.Q(
                    weekly_target__gte=1,
                ) | models.Q(
                    weekly_target__isnull=True,
                ),
                name="habit_weekly_target_valid",
            ),
        ]

    def clean(self):

        if (
            self.frequency_type == "weekly_count"
            and self.weekly_target is None
        ):
            raise ValidationError(
                {
                    "weekly_target": (
                        "Weekly target is required "
                        "for weekly_count habits."
                    )
                }
            )

        if (
            self.frequency_type == "daily"
            and self.weekly_target is not None
        ):
            raise ValidationError(
                {
                    "weekly_target": (
                        "Daily habits should not "
                        "have weekly targets."
                    )
                }
            )

        if (
            self.habit_type == "boolean"
            and self.target_value != 1
        ):
            raise ValidationError(
                {
                    "target_value": (
                        "Boolean habits must "
                        "have target value 1."
                    )
                }
            )

    def save(self, *args, **kwargs):

        self.full_clean()

        super().save(*args, **kwargs)

    def __str__(self):

        return self.name
