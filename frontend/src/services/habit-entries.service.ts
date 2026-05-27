import type {PaginatedResponse} from "@/types/api.types";

import type {HabitEntry} from "../types/habit-entry.types";
import api from "@/lib/api";

export async function getHabitEntries(habitId: string): Promise<HabitEntry[]> {
    const response = await api.get<PaginatedResponse<HabitEntry>>(`/habit-entries/?habit=${habitId}`);

    return response.data.results;
}
