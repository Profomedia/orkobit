import random
from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.habit.models.habit import Habit
from apps.habit.models.habit_entry import HabitEntry


class Command(BaseCommand):
    help = "Seed habits and habit entries"

    def handle(self, *args, **kwargs):

        self.stdout.write("")
        self.stdout.write(self.style.SUCCESS("🌱 Seeding Orkobit database..."))
        self.stdout.write("")

        HabitEntry.objects.all().delete()
        Habit.objects.all().delete()

        habits_data = [
            {
                "name": "Pushups",
                "habit_type": "number",
                "target_value": 100,
                "unit": "reps",
                "color": "#ff6b6b",
                "icon": "dumbbell",
            },
            {
                "name": "Reading",
                "habit_type": "timer",
                "target_value": 3600,
                "unit": "seconds",
                "color": "#4dabf7",
                "icon": "book",
            },
            {
                "name": "Cold Shower",
                "habit_type": "boolean",
                "target_value": 1,
                "unit": "",
                "color": "#74c0fc",
                "icon": "snowflake",
            },
            {
                "name": "Coding",
                "habit_type": "timer",
                "target_value": 7200,
                "unit": "seconds",
                "color": "#9775fa",
                "icon": "code",
            },
            {
                "name": "Meditation",
                "habit_type": "timer",
                "target_value": 900,
                "unit": "seconds",
                "color": "#63e6be",
                "icon": "brain",
            },
        ]

        created_habits = []

        for data in habits_data:

            habit = Habit.objects.create(
                name=data["name"],
                habit_type=data["habit_type"],
                target_value=data["target_value"],
                unit=data["unit"],
                color=data["color"],
                icon=data["icon"],
            )

            created_habits.append(habit)

            self.stdout.write(
                self.style.SUCCESS(f"✅ Created habit: {habit.name}")
            )

        entries_to_create = []

        today = timezone.now().date()

        for habit in created_habits:

            for i in range(90):

                entry_date = today - timedelta(days=i)

                completed = random.random() > 0.2

                entry = HabitEntry(
                    habit=habit,
                    date=entry_date,
                    completed=completed,
                )

                if habit.habit_type == "number":
                    entry.value_number = random.randint(20, 150)

                elif habit.habit_type == "timer":
                    entry.duration_seconds = random.randint(300, 7200)

                elif habit.habit_type == "boolean":
                    entry.value_boolean = completed

                entries_to_create.append(entry)

        HabitEntry.objects.bulk_create(
            entries_to_create,
            batch_size=1000,
        )

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                f"🔥 Created {len(created_habits)} habits"
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"🔥 Created {len(entries_to_create)} entries"
            )
        )

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS("🚀 Orkobit seed completed.")
        )
        self.stdout.write("")
