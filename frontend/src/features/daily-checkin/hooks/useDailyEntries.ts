import {HabitEntry} from "../types/daily-checkin.types";
import {useState} from "react";

export function useDailyEntries() {
    const [entries, setEntries] = useState<HabitEntry[]>([]);

    function upsertEntry(entry: HabitEntry) {
        setEntries((prev) => {
            const exists = prev.find((item) => item.habit_id === entry.habit_id);

            if (exists) {
                return prev.map((item) => (item.habit_id === entry.habit_id ? entry : item));
            }

            return [...prev, entry];
        });
    }

    return {
        entries,
        upsertEntry,
    };
}
