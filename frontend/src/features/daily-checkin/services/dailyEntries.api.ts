import api from "@/lib/api";

export interface SaveHabitEntryPayload {
    habit: string;

    date: string;

    value_number?: number;

    value_boolean?: boolean;

    value_text?: string;

    duration_seconds?: number;
}

export interface HabitEntryResponse {
    id: string;

    habit: string;

    date: string;

    value_number: number | null;

    value_boolean: boolean | null;

    value_text: string | null;

    duration_seconds: number | null;

    created_at: string;

    updated_at: string;
}

export async function saveHabitEntry(payload: SaveHabitEntryPayload) {
    const response = await api.post<HabitEntryResponse>("/habit-entries/", payload);

    return response.data;
}
