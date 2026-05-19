export type HabitType =
    | "checkbox"
    | "number"
    | "timer"
    | "boolean"
    | "rating"
    | "streak";

export interface Habit {
    id: number;
    uuid: string;

    name: string;
    description: string | null;

    habit_type: HabitType;

    target_value: number;

    unit: string | null;

    color: string;

    icon: string | null;

    is_archived: boolean;

    created_at: string;
    updated_at: string;
}
