import dayjs from "dayjs";

import {useDailyCheckinStore,} from "../store/dailyCheckin.store";
import { useUpsertHabitEntry } from "../hooks/useUpsertHabitEntry";



interface NumberHabitInputProps {
    habitId: string;
}

export default function NumberHabitInput({
    habitId,
}: NumberHabitInputProps) {

    const value = useDailyCheckinStore(
        (state) => state.getValue(habitId, 0) as number,
    );

    const setValue = useDailyCheckinStore(
        (state) => state.setValue,
    );

    const mutation = useUpsertHabitEntry();

    const updateValue = (nextValue: number) => {

        setValue(habitId, nextValue);

        mutation.mutate({
            habit: habitId,
            value: nextValue,
            habitType: "number",
            date: dayjs().format("YYYY-MM-DD"),
        });
    };

    return (
        <div className="flex items-center gap-3">

            <button
                type="button"
                onClick={() => updateValue(
                    Math.max(0, value - 1),
                )}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900"
            >
                -
            </button>

            <div className="min-w-[60px] text-center text-lg font-semibold">
                {value}
            </div>

            <button
                type="button"
                onClick={() => updateValue(value + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900"
            >
                +
            </button>

        </div>
    );
}