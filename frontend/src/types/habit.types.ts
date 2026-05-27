export type HabitType =
    | "checkbox"
    | "number"
    | "timer";

export type FrequencyType =
    | "daily"
    | "weekly"
    | "monthly";

export type HabitValue =
    | boolean
    | number;

export interface Habit {
    id: string;

    name: string;

    description?: string;

    habit_type: HabitType;

    frequency_type: FrequencyType;

    target_value?: number;

    is_archived?: boolean;

    created_at?: string;

    updated_at?: string;
    color?: string;
    weekly_target?:number;
    unit?:string;
}