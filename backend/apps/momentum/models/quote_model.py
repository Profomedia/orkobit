import uuid

from django.db import models


class Quote(models.Model):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    text = models.TextField()

    author = models.CharField(
        max_length=100,
        blank=True,
        null=True,
    )

    color = models.CharField(
        max_length=20,
        default="#7c5cff",
    )

    is_favorite = models.BooleanField(
        default=False,
        db_index=True,
    )

    is_pinned = models.BooleanField(
        default=False,
        db_index=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.text[:50]
