import {getHabits} from "@/features/habits/services/habits.service";
import {useQuery} from "@tanstack/react-query";

export function useHabits() {
    return useQuery({
        queryKey: ["habits"],

        queryFn: getHabits,
    });
}
