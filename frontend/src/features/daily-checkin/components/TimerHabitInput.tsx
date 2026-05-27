import dayjs from "dayjs";

import {useDailyCheckinStore,} from "../store/dailyCheckin.store";

import {useUpsertHabitEntry,} from
"../hooks/useUpsertHabitEntry";

interface TimerHabitInputProps {
    habitId: string;
    date:string;
    disabled?:boolean;
}

export default function TimerHabitInput({
    habitId,date, disabled
}: TimerHabitInputProps) {

    const value = useDailyCheckinStore(
        (state) => state.getValue(
            habitId,
            "0",
        ) as number,
    );

    const setValue = useDailyCheckinStore(
        (state) => state.setValue,
    );

    const mutation = useUpsertHabitEntry();

    const quickOptions = [5, 15, 30, 60, 120];

    const updateValue = (minutes: number) => {

        setValue(habitId, date, minutes);

        mutation.mutate({
            habit: habitId,
            value: minutes,
            habitType: "timer",
            date: dayjs().format("YYYY-MM-DD"),
        });
    };

    return (
        <div className="flex flex-wrap gap-2">

            {quickOptions.map((minutes) => (
                <button
                    key={minutes}
                    type="button"
                    onClick={() => updateValue(minutes)}
                    className={[
                        "rounded-xl border px-4 py-2 text-sm transition-all",

                        value === minutes
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-zinc-700 bg-zinc-900",
                    ].join(" ")}
                >
                    {minutes}m
                </button>
            ))}

        </div>
    );
}