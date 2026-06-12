// src/features/habits/components/NumberHabitInput.tsx

import { useEffect, useRef, useState } from "react";

import { useUpsertHabitEntry } from "../hooks/useUpsertHabitEntry";
import { useDailyCheckinStore } from "../store/dailyCheckin.store";

interface NumberHabitInputProps {
    habitId: string;
    date: string;
    disabled?: boolean;
}

export default function NumberHabitInput({
    habitId,
    date,
    disabled = false,
}: NumberHabitInputProps) {
    const storedValue = useDailyCheckinStore(
        (state) => state.getValue(date, habitId, 0) as number,
    );

    const setValue = useDailyCheckinStore((state) => state.setValue);

    const mutation = useUpsertHabitEntry();

    const [inputValue, setInputValue] = useState(
        String(Math.trunc(Number(storedValue))),
    );

    const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        setInputValue(String(Math.trunc(Number(storedValue))));
    }, [storedValue]);

    const syncValue = (nextValue: number) => {
        if (disabled) return;

        const safeValue = Math.max(0, Math.trunc(nextValue));

        setValue(date, habitId, safeValue);

        mutation.mutate({
            habit: habitId,
            value: safeValue,
            habitType: "number",
            date,
        });
    };

    const changeBy = (amount: number) => {
        syncValue(Math.trunc(Number(storedValue)) + amount);
    };

    const startHold = (amount: number) => {
        changeBy(amount);

        timeoutRef.current = setInterval(() => {
            changeBy(amount);
        }, 120);
    };

    const stopHold = () => {
        if (timeoutRef.current) {
            clearInterval(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex w-full gap-2">
                <button
                    type="button"
                    onMouseDown={() => startHold(-10)}
                    onMouseUp={stopHold}
                    onMouseLeave={stopHold}
                    disabled={disabled}
                    className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                >
                    -10
                </button>

                <button
                    type="button"
                    onMouseDown={() => startHold(-1)}
                    onMouseUp={stopHold}
                    onMouseLeave={stopHold}
                    disabled={disabled}
                    className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                >
                    -1
                </button>
            </div>

            <input
                type="number"
                min={0}
                step={1}
                placeholder="0"
                value={inputValue}
                disabled={disabled}
                onChange={(event) => {
                    setInputValue(event.target.value);
                }}
                onBlur={() => {
                    syncValue(parseInt(inputValue, 10) || 0);
                }}
                className="w-full rounded-xl border border-zinc-400 bg-zinc-900 px-3 py-2 text-center outline-none"
            />

            <div className="flex w-full gap-2">
                <button
                    type="button"
                    onMouseDown={() => startHold(1)}
                    onMouseUp={stopHold}
                    onMouseLeave={stopHold}
                    disabled={disabled}
                    className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                >
                    +1
                </button>

                <button
                    type="button"
                    onMouseDown={() => startHold(10)}
                    onMouseUp={stopHold}
                    onMouseLeave={stopHold}
                    disabled={disabled}
                    className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm"
                >
                    +10
                </button>
            </div>
        </div>
    );
}
