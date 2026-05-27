from apps.habit.models.habit_entry import (
    HabitEntry,
)


def save_habit_entry(
    *,
    habit,
    date,
    value_number=None,
    value_boolean=None,
    value_text=None,
    duration_seconds=None,
):
    """
    Create or update a habit entry
    for a specific date.
    """

    entry, created = (
        HabitEntry.objects.update_or_create(
            habit=habit,
            date=date,

            defaults={

                "value_number":
                    value_number,

                "value_boolean":
                    value_boolean,

                "value_text":
                    value_text,

                "duration_seconds":
                    duration_seconds,
            },
        )
    )

    return entry, created
