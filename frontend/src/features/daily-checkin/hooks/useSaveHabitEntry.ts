import {useMutation} from "@tanstack/react-query";

import {saveHabitEntry} from "../services/dailyEntries.api";

export function useSaveHabitEntry() {
    return useMutation({
        mutationFn: saveHabitEntry,
    });
}
