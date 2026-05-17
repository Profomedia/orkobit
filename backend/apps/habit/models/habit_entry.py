import uuid
from django.db import models
from .habit import Habit
class HabitEntry(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name="entries")
    date = models.DateField()
    completed = models.BooleanField(default=False)
    value_number = models.FloatField(blank=True, null=True)
    value_boolean = models.BooleanField(blank=True, null=True)
    value_text = models.TextField(blank=True, null=True)
    duration_seconds = models.PositiveIntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
      ordering = ["-date"]
      unique_together = ["habit", "date"]

    def __str__(self):
      return f"{self.habit.name} - {self.date}"
