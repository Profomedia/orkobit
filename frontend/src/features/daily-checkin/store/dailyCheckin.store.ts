import {create,} from "zustand";
import {persist,} from "zustand/middleware";

type HabitValue = boolean | number;

interface DailyCheckinStore {
  pendingSyncIds: string[];
  values: Record<string, Record<string, HabitValue>>;

  addPendingSync: (id: string) => void;
  removePendingSync: (id: string) => void;

  getValue: (
    date: string,
    habitId: string,
    fallback?: HabitValue,
  ) => HabitValue;

  setValue: (
    date: string,
    habitId: string,
    value: HabitValue,
  ) => void;

  clearDate: (date: string) => void;
}

export const useDailyCheckinStore = create<DailyCheckinStore>()(
  persist(
    (set, get) => ({
      pendingSyncIds: [],
      values: {},

      addPendingSync: (id) =>
        set((state) => ({
          pendingSyncIds: state.pendingSyncIds.includes(id)
            ? state.pendingSyncIds
            : [...state.pendingSyncIds, id],
        })),

      removePendingSync: (id) =>
        set((state) => ({
          pendingSyncIds: state.pendingSyncIds.filter(
            (item) => item !== id,
          ),
        })),

      getValue: (
        date,
        habitId,
        fallback = 0,
      ) => {

        return (
          get().values[date]?.[habitId]
          ?? fallback
        );
      },

      setValue: (
        date,
        habitId,
        value,
      ) => {

        set((state) => ({
          values: {
            ...state.values,

            [date]: {
              ...state.values[date],
              [habitId]: value,
            },
          },
        }));
      },

      clearDate: (date) =>
        set((state) => {
          const updated = {...state.values,};

          delete updated[date];

          return {
            values: updated,
          };
        }),
    }),

    {
      name: "daily-checkin-store",
    },
  ),
);