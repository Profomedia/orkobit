import uuid

from django.core.exceptions import (
    ValidationError,
)

from django.db import models

from .habit import Habit


class HabitEntry(models.Model):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True,
    )

    habit = models.ForeignKey(
        Habit,
        on_delete=models.CASCADE,
        related_name="entries",
    )

    date = models.DateField(
        db_index=True,
    )

    # -----------------------------------------
    # Flexible Value Storage
    # -----------------------------------------

    value_number = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
    )

    value_boolean = models.BooleanField(
        blank=True,
        null=True,
    )

    value_text = models.TextField(
        blank=True,
        null=True,
    )

    duration_seconds = models.PositiveIntegerField(
        blank=True,
        null=True,
    )

    notes = models.TextField(
        blank=True,
        null=True,
    )

    position = models.PositiveIntegerField(
        default=0,
    )

    # -----------------------------------------
    # Metadata
    # -----------------------------------------

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:

        ordering = [
            "-date",
            "-created_at",
        ]

        indexes = [

            models.Index(
                fields=[
                    "habit",
                    "-date",
                ],
            ),

            models.Index(
                fields=[
                    "date",
                ],
            ),

            models.Index(
                fields=[
                    "created_at",
                ],
            ),
        ]

        constraints = [

            models.UniqueConstraint(
                fields=[
                    "habit",
                    "date",
                ],
                name="unique_habit_entry_per_day",
            ),

            models.CheckConstraint(
                condition=models.Q(
                    duration_seconds__gte=0,
                ) | models.Q(
                    duration_seconds__isnull=True,
                ),
                name=(
                    "habit_entry_duration_seconds_gte_0"
                ),
            ),

            models.CheckConstraint(
                condition=models.Q(
                    value_number__gte=0,
                ) | models.Q(
                    value_number__isnull=True,
                ),
                name=(
                    "habit_entry_value_number_gte_0"
                ),
            ),
        ]

    def clean(self):

        kind = (
            self.habit.habit_type
        )

        # ---------------------------------
        # BOOLEAN
        # ---------------------------------

        if kind == "boolean":

            if (
                self.value_number
                is not None
            ):
                raise ValidationError(
                    {
                        "value_number": (
                            "Boolean habits "
                            "cannot use numeric values."
                        )
                    }
                )

            if (
                self.duration_seconds
                is not None
            ):
                raise ValidationError(
                    {
                        "duration_seconds": (
                            "Boolean habits "
                            "cannot use durations."
                        )
                    }
                )

            if (
                self.value_boolean
                is None
            ):
                raise ValidationError(
                    {
                        "value_boolean": (
                            "Boolean habits "
                            "require a boolean value."
                        )
                    }
                )

        # ---------------------------------
        # NUMBER
        # ---------------------------------

        elif kind == "number":

            if (
                self.value_number
                is None
            ):
                raise ValidationError(
                    {
                        "value_number": (
                            "Number habits "
                            "require a numeric value."
                        )
                    }
                )

            if (
                self.duration_seconds
                is not None
            ):
                raise ValidationError(
                    {
                        "duration_seconds": (
                            "Number habits "
                            "cannot use durations."
                        )
                    }
                )

            if (
                self.value_boolean
                is not None
            ):
                raise ValidationError(
                    {
                        "value_boolean": (
                            "Number habits "
                            "cannot use boolean values."
                        )
                    }
                )

        # ---------------------------------
        # TIMER
        # ---------------------------------

        elif kind == "timer":

            if (
                self.duration_seconds
                is None
            ):
                raise ValidationError(
                    {
                        "duration_seconds": (
                            "Timer habits "
                            "require duration."
                        )
                    }
                )

            if (
                self.value_number
                is not None
            ):
                raise ValidationError(
                    {
                        "value_number": (
                            "Timer habits "
                            "cannot use numeric values."
                        )
                    }
                )

            if (
                self.value_boolean
                is not None
            ):
                raise ValidationError(
                    {
                        "value_boolean": (
                            "Timer habits "
                            "cannot use boolean values."
                        )
                    }
                )

        # ---------------------------------
        # RATING
        # ---------------------------------

        elif kind == "rating":

            if (
                self.value_number
                is None
            ):
                raise ValidationError(
                    {
                        "value_number": (
                            "Rating habits "
                            "require a numeric value."
                        )
                    }
                )

            if not (
                1 <= self.value_number <= 10
            ):
                raise ValidationError(
                    {
                        "value_number": (
                            "Rating must be "
                            "between 1 and 10."
                        )
                    }
                )

    @property
    def is_completed(self):

        kind = (
            self.habit.habit_type
        )

        # ---------------------------------
        # BOOLEAN
        # ---------------------------------

        if kind == "boolean":

            return (
                self.value_boolean
                is True
            )

        # ---------------------------------
        # NUMBER
        # ---------------------------------

        if kind == "number":

            return (
                self.value_number
                is not None
                and self.value_number >=
                self.habit.target_value
            )

        # ---------------------------------
        # TIMER
        # ---------------------------------

        if kind == "timer":

            return (
                self.duration_seconds
                is not None
                and self.duration_seconds >= float(
                    self.habit.target_value
                )
            )

        # ---------------------------------
        # RATING
        # ---------------------------------

        if kind == "rating":

            return (
                self.value_number
                is not None
            )

        return False

    def save(self, *args, **kwargs):

        self.full_clean()

        super().save(
            *args,
            **kwargs,
        )

    def __str__(self):

        return (
            f"{self.habit.name} - {self.date}"
        )
