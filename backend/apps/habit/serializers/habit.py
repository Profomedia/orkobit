from rest_framework import serializers

from ..models.habit import Habit


class HabitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Habit

        fields = [
            "id",
            "uuid",
            "name",
            "description",
            "habit_type",
            "target_value",
            "unit",
            "color",
            "icon",
            "is_archived",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "uuid",
            "created_at",
            "updated_at",
        ]
