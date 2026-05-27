
import { HabitEntry } from "@/types/habit-entry.types";
import {useState} from "react";

export function useDailyEntries() {
    const [entries, setEntries] = useState<HabitEntry[]>([]);

    function upsertEntry(entry: HabitEntry) {
        setEntries((prev) => {
            const exists = prev.find((item) => item.habit=== entry.habit);

            if (exists) {
                return prev.map((item) => (item.habit === entry.habit? entry : item));
            }

            return [...prev, entry];
        });
    }

    return {
        entries,
        upsertEntry,
    };
}
