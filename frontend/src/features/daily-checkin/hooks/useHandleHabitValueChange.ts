import type {Habit} from "@/types/habit.types";

import {useDailyCheckinStore} from "../store/dailyCheckin.store";

import {useSaveHabitEntry} from "./useSaveHabitEntry";

import {buildHabitEntryPayload} from "../utils/buildHabitEntryPayload";
import axios from "axios";
export function useHandleHabitValueChange() {
    const {setValue} = useDailyCheckinStore();

    const {mutateAsync: saveHabitEntryMutation} = useSaveHabitEntry();

    async function handleHabitValueChange(habit: Habit, value: boolean | number, date: string) {
        const habitId = String(habit.id);

        /**
         * Optimistic UI update
         */
        setValue(habitId,date, value);

        try {
            const payload = buildHabitEntryPayload(habit, value);

            await saveHabitEntryMutation(payload);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Backend validation error:", error.response?.data);
            } else {
                console.error(error);
            }
        }
    }

    return {
        handleHabitValueChange,
    };
}
