import {useQuery,} from "@tanstack/react-query";

import {getDailyEntries,} from "../services/dailyEntries.api";
import type {HabitEntry,} from "@/types/habit-entry.types";

export function useDailyEntries() {
    return useQuery<HabitEntry[]>({
        queryKey: ["daily-entries"],
        queryFn: getDailyEntries,
    });
}