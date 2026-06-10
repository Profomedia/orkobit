import {useQuery,} from "@tanstack/react-query";
import {getHabitEntries,} from "../services/getHabitEntries";

export function useHabitEntries() {
    return useQuery({
        queryKey: ["habit-entries"],
        queryFn: getHabitEntries,
    });
}