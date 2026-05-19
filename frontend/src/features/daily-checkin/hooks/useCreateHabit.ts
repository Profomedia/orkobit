import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createHabit } from "../services/createHabit";

export function useCreateHabit() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createHabit,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["habits"],
            });
        },
    });
}
