from rest_framework import serializers

from apps.habit.models.habit_entry import (
    HabitEntry,
)


class HabitEntrySerializer(
    serializers.ModelSerializer
):

    is_completed = (
        serializers.ReadOnlyField()
    )

    class Meta:

        model = HabitEntry

        fields = "__all__"

        validators = []
