export type HabitType = "boolean" | "number" | "timer" | "rating";

export interface Habit {
    id: string;

    name: string;

    description: string;

    color: string;

    icon: string;

    habit_type: HabitType;

    target_value: number | null;

    created_at: string;

    updated_at: string;

    is_archived: boolean;
}

export interface CreateHabitDto {
    name: string;

    description?: string;

    habit_type: HabitType;

    target_value?: number;

    color?: string;
}
