import {create} from "zustand";

import {persist} from "zustand/middleware";

type HabitValue = boolean | number;

interface DailyCheckinStore {
    pendingSyncIds: string[];
    values: Record<string, HabitValue>;
    addPendingSync: (id: string) => void;
    removePendingSync: (id: string) => void;
    setValue: (habitId: string, value: HabitValue) => void;
    resetValues: () => void;
}

export const useDailyCheckinStore = create<DailyCheckinStore>()(
    persist(
        (set) => ({
            pendingSyncIds: [],
            values: {},
            addPendingSync: (id) =>
                set((state) => ({
                    pendingSyncIds: [...state.pendingSyncIds, id],
                })),

            removePendingSync: (id) =>
                set((state) => ({
                    pendingSyncIds: state.pendingSyncIds.filter((item) => item !== id),
                })),

            setValue: (habitId, value) =>
                set((state) => ({
                    values: {
                        ...state.values,
                        [habitId]: value,
                    },
                })),

            resetValues: () =>
                set({
                    values: {},
                }),
        }),

        {
            name: "orkobit-daily-checkin",
        },
    ),
);
