import {create,} from "zustand";
import {persist,} from "zustand/middleware";
import dayjs from "dayjs";

type HabitValue = boolean | number;

interface DailyCheckinStore {
  pendingSyncIds: string[];
  values: Record<string, Record<string, HabitValue>>;

  addPendingSync: (id: string) => void;
  removePendingSync: (id: string) => void;

  getValue: (
    habitId: string,
    fallback?: HabitValue,
  ) => HabitValue;

  setValue: (
    habitId: string,
    value: HabitValue,
  ) => void;

  clearDate: (date: string) => void;
}

const getToday = () => dayjs().format("YYYY-MM-DD");

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

      getValue: (habitId, fallback = 0) => {
        const today = getToday();

        return (
          get().values[today]?.[habitId]
          ?? fallback
        );
      },

      setValue: (habitId, value) => {
        const today = getToday();

        set((state) => ({
          values: {
            ...state.values,

            [today]: {
              ...state.values[today],
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