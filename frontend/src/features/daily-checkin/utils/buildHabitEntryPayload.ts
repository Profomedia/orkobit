import type { Habit } from "@/types/habit.types";

import type { SaveHabitEntryPayload } from "../services/dailyEntries.api";

export function buildHabitEntryPayload(
    habit: Habit,
    value: boolean | number,
): SaveHabitEntryPayload {
    const payload: SaveHabitEntryPayload = {
        habit: String(habit.id),

        date: new Date().toISOString().split("T")[0],
};

    switch (habit.habit_type) {
        case "boolean":
            payload.value_boolean = Boolean(value);

            break;

        case "number":
            payload.value_number = Number(value);

            break;

        case "timer":
            payload.duration_seconds = Number(value);

            break;
    }

    return payload;
}
