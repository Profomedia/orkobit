import {useQuery} from "@tanstack/react-query";

import {getHabitEntries} from "../services/habit-entries.service";

export function useHabitEntries(habitId: string) {
    return useQuery({
        queryKey: ["habit-entries", habitId],

        queryFn: () => getHabitEntries(habitId),

        enabled: !!habitId,
    });
}
