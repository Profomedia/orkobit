export type HabitType = "boolean" | "number" | "timer";

export type FrequencyType = "daily" | "weekly_count";

export interface Habit {
    id: string;
    name: string;
    icon?: string;
    color?: string;
    habit_type: HabitType;
    frequency_type: FrequencyType;
    weekly_target?: number;
    target_value?: number;
    unit?: string;
    created_at: string;
    updated_at: string;
}

export interface HabitEntry {
    id: string;
    habit_id: string;
    completed_at: string;
    value: boolean | number;
    created_at: string;
    updated_at: string;
}
