from django.db.models import Prefetch

from rest_framework import (
    status,
    viewsets,
)

from rest_framework.decorators import (
    action,
)

from rest_framework.response import (
    Response,
)

from apps.habit.models.habit import (
    Habit,
)

from apps.habit.models.habit_entry import (
    HabitEntry,
)

from apps.habit.serializers.habit import (
    HabitSerializer,
)

from apps.habit.serializers.habit_entry import (
    HabitEntrySerializer,
)

from apps.habit.services import (
    save_habit_entry,
)


class HabitViewSet(
    viewsets.ModelViewSet
):
    serializer_class = (
        HabitSerializer
    )

    def get_queryset(self):
        return (
            Habit.objects
            .prefetch_related(
                Prefetch(
                    "entries",

                    queryset=HabitEntry.objects
                    .order_by("-date"),
                )
            )
            .order_by("-created_at")
        )

    @action(
        detail=True,
        methods=["get"],
    )
    def entries(
        self,
        request,
        pk=None,
    ):
        habit = self.get_object()

        queryset = (
            habit.entries
            .all()
            .order_by("-date")
        )

        serializer = (
            HabitEntrySerializer(
                queryset,
                many=True,
            )
        )

        return Response(
            serializer.data,
        )

    @action(
        detail=True,
        methods=["post"],
    )
    def archive(
        self,
        request,
        pk=None,
    ):
        habit = self.get_object()

        habit.is_archived = True

        habit.save(
            update_fields=[
                "is_archived",
            ]
        )

        return Response(
            {
                "detail":
                    "Habit archived successfully.",
            },

            status=status.HTTP_200_OK,
        )

    @action(
        detail=True,
        methods=["post"],
    )
    def unarchive(
        self,
        request,
        pk=None,
    ):
        habit = self.get_object()

        habit.is_archived = False

        habit.save(
            update_fields=[
                "is_archived",
            ]
        )

        return Response(
            {
                "detail":
                    "Habit restored successfully.",
            },

            status=status.HTTP_200_OK,
        )


class HabitEntryViewSet(
    viewsets.ModelViewSet
):
    serializer_class = (
        HabitEntrySerializer
    )

    def get_queryset(self):

        queryset = (
            HabitEntry.objects
            .select_related("habit")
            .order_by("-date")
        )

        habit_id = (
            self.request.query_params.get(
                "habit",
            )
        )

        if habit_id:
            queryset = queryset.filter(
                habit__id=habit_id,
            )

       

        return queryset

    def create(
        self,
        request,
        *args,
        **kwargs,
    ):

        serializer = (
            self.get_serializer(
                data=request.data,
            )
        )

        serializer.is_valid(
            raise_exception=True,
        )

        validated_data = (
            serializer.validated_data
        )

        entry, created = (
            save_habit_entry(
                habit=validated_data[
                    "habit"
                ],

                date=validated_data[
                    "date"
                ],

                value_number=validated_data.get(
                    "value_number",
                ),

                value_boolean=validated_data.get(
                    "value_boolean",
                ),

                value_text=validated_data.get(
                    "value_text",
                ),

                duration_seconds=validated_data.get(
                    "duration_seconds",
                ),
            )
        )

        response_serializer = (
            self.get_serializer(
                entry,
            )
        )

        return Response(
            response_serializer.data,

            status=status.HTTP_201_CREATED
            if created
            else status.HTTP_200_OK,
        )
