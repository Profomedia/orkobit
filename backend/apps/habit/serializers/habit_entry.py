from rest_framework import serializers
from ..models.habit_entry import HabitEntry

class HabitEntrySerializer(serializers.ModelSerializer):
  class Meta:
    model = HabitEntry
    
    fields = [
      "id",
      "uuid",
      "habit",
      "date",
      "completed",
      "value_number",
      "value_boolean",
      "value_text",
      "duration_seconds",
      "created_at",
      "updated_at",
    ]
    
    read_only_fields = [
      "id",
      "uuid",
      "created_at",
      "updated_at",
    ]