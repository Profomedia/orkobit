from rest_framework import serializers

from apps.habit.models.habit import Habit


class HabitSerializer(serializers.ModelSerializer):

    class Meta:

        model = Habit

        fields = "__all__"
