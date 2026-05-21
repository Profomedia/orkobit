// import {useMemo,} from "react";

import { useHabits } from "@/hooks/useHabits";
import type { Habit } from "../types/habit";
import { useDailyCheckinStore } from "../store/dailyCheckin.store";
import { useMemo } from "react";
import HabitInputRenderer from "../components/HabitInputRenderer";

// import {useHabits,} from "../../hooks/useHabits";

// import HabitInputRenderer from "../../features/today/components/HabitInputRenderer";

// import {useDailyCheckinStore,} from "../../store/daily-checkin-store";

// import type {Habit,} from "../../types/habit";

function getDefaultValue(
    habitType: Habit["habit_type"],
): boolean | number {

    switch (habitType) {
        case "boolean":
            return false;

        case "number":
            return 0;

        case "timer":
            return 0;

        default:
            return 0;
    }
}

export default function TodayPage() {

    const {
        data: habits = [],
        isLoading,
        isError,
    } = useHabits();

    const getValue = useDailyCheckinStore(
        (state) => state.getValue,
    );

    const completedHabits = useMemo(() => {
        return habits.filter((habit) => {

            const value = getValue(
                String(habit.id),
                getDefaultValue(habit.habit_type),
            );

            if (typeof value === "boolean") {
                return value;
            }

            return value > 0;

        }).length;
    }, [habits, getValue]);

    if (isLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p>Loading habits...</p>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p>Failed to load habits.</p>
            </main>
        );
    }

    return (
        <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6">

            <section className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        Today
                    </h1>

                    <p className="text-sm text-zinc-500">
                        {completedHabits} / {habits.length} completed
                    </p>
                </div>
            </section>

            <section className="flex flex-col gap-3">
                {habits.map((habit) => {

                    const habitId = String(habit.id);

                    return (
                        <article
                            className="flex items-center justify-between rounded-2xl border p-4"
                            key={habit.id}
                        >

                            <div className="flex flex-col">
                                <h2 className="font-medium">
                                    {habit.name}
                                </h2>

                                <p className="text-sm capitalize text-zinc-500">
                                    {habit.habit_type}
                                </p>
                            </div>

                            <HabitInputRenderer
                                habit={habit}
                                value={getValue(
                                    habitId,
                                    getDefaultValue(habit.habit_type),
                                )}
                            />
                        </article>
                    );
                })}
            </section>
        </main>
    );
}