from django.db import models
import uuid

class Habit(models.Model):

    HABIT_TYPES = [
        ("checkbox", "Checkbox"),
        ("number", "Number"),
        ("timer", "Timer"),
        ("boolean", "Yes / No"),
        ("rating", "Rating"),
        ("streak", "Streak Only"),
    ]

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True,)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    habit_type = models.CharField(
        max_length=20, choices=HABIT_TYPES, default="checkbox")
    target_value = models.FloatField(default=1,)
    unit = models.CharField(max_length=50, blank=True, null=True)
    color = models.CharField(max_length=20, default="#7c5cff")
    icon = models.CharField(max_length=50, blank=True, null=True)
    # Instead of deleting habits: deleting destroys analytics, charts, progress, streak history
    is_archived = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
      ordering = ["-created_at"]

    def __str__(self):
      return self.name
