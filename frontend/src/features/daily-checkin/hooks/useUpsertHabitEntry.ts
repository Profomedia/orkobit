import api from "@/lib/api";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

type HabitType =
    | "boolean"
    | "number"
    | "timer"
    | "rating";

interface UpsertHabitEntryPayload {
    habit: string;
    value: boolean | number;
    habitType: HabitType;
    date: string;
}

export function useUpsertHabitEntry() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            payload: UpsertHabitEntryPayload,
        ) => {

            const body: Record<string, unknown> = {
                habit: payload.habit,
                date: payload.date,
            };

            switch (payload.habitType) {

                case "boolean":
                    body.value_boolean = payload.value;
                    break;

                case "number":
                    body.value_number = payload.value;
                    break;

                case "timer":
                    body.value_timer = payload.value;
                    break;

                case "rating":
                    body.value_number = payload.value;
                    break;
            }

            return api.post(
                "/habit-entries/",
                body,
            );
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["habit-entries"],
            });
        },
    });
}