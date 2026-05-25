import {useUpsertHabitEntry,} from "../hooks/useUpsertHabitEntry";
import {useDailyCheckinStore,} from "../store/dailyCheckin.store";

interface BooleanHabitInputProps {
    habitId: string;
    date: string;
    disabled?:boolean;
}

export default function BooleanHabitInput({
    habitId,
    date,
    disabled = false,
}: BooleanHabitInputProps) {

    const value = useDailyCheckinStore(
        (state) => state.getValue(
            date,
            habitId,
            false,
        ) as boolean,
    );

    const setValue = useDailyCheckinStore(
        (state) => state.setValue,
    );

    const mutation = useUpsertHabitEntry();

    const toggleValue = () => {

        if(disabled){
            return
        }
        const nextValue = !value;

        setValue(
            date,
            habitId,
            nextValue,
        );

        mutation.mutate({
            habit: habitId,
            value: nextValue,
            habitType: "boolean",
            date,
        });
    };

    return (
        <button
            type="button"
            onClick={toggleValue}
            disabled={disabled}
            className={[
    "flex h-10 w-10 items-center justify-center rounded-xl border transition-all",

            disabled
                ? "cursor-not-allowed border-zinc-800 bg-zinc-900 opacity-40"
                : value
                    ? "bg-green-500 text-black"
                    : "border-zinc-700 bg-zinc-900",
        ].join(" ")}
                >
            {value ? "✓" : ""}
        </button>
    );
}