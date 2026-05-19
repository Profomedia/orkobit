

import type { PaginatedResponse } from "@/types/api.types";

import type { Habit } from "../types/habit.types";
import api from "@/lib/api";

export async function getHabits(): Promise<Habit[]> {
    const response = await api.get<PaginatedResponse<Habit>>("/habits/");

    return response.data.results;
}
