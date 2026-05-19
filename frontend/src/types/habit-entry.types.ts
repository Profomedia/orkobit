export interface HabitEntry {
    id: string;

    habit: string;

    date: string;

    is_completed: boolean;

    value_number: number | null;

    value_boolean: boolean | null;

    value_text: string | null;

    duration_seconds: number | null;

    notes: string | null;

    created_at: string;

    updated_at: string;
}
