import {useDailyCheckinStore,} from "../store/dailyCheckin.store";

interface BooleanHabitInputProps {
    habitId: string;
}

export default function BooleanHabitInput({
    habitId,
}: BooleanHabitInputProps) {

    const value = useDailyCheckinStore(
        (state) => state.getValue(habitId, false) as boolean,
    );

    const setValue = useDailyCheckinStore(
        (state) => state.setValue,
    );

    return (
        <button
            type="button"
            onClick={() => setValue(habitId, !value)}
            className={[
                "flex h-10 w-10 items-center justify-center rounded-xl border",
                value
                    ? "bg-green-500 text-black"
                    : "border-zinc-700 bg-zinc-900",
            ].join(" ")}
        >
            {value ? "✓" : ""}
        </button>
    );
}