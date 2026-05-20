import {useMemo} from "react";

import HabitRow from "../components/HabitRow";

import type {Habit} from "@/types/habit.types";

import {useHabits} from "@/hooks/useHabits";

import {useDailyCheckinStore} from "../store/dailyCheckin.store";
import {useHandleHabitValueChange} from "../hooks/useHandleHabitValueChange";

type HabitValue = boolean | number;

function getDefaultValue(habitType: Habit["habit_type"]): HabitValue {
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
    const {data: habits = [], isLoading, isError} = useHabits();
    const {values, setValue} = useDailyCheckinStore();
    const {handleHabitValueChange} = useHandleHabitValueChange();

    console.log(values);
    /**
     * Initialize missing habit values
     */
    useMemo(() => {
        habits.forEach((habit) => {
            const habitId = String(habit.id);

            if (values[habitId] === undefined) {
                setValue(habitId, getDefaultValue(habit.habit_type));
            }
        });
    }, [habits, values, setValue]);

    const completedHabits = Object.values(values).filter((value) => {
        if (typeof value === "boolean") {
            return value === true;
        }

        return value > 0;
    }).length;

    const completionPercentage = habits.length > 0 ? Math.round((completedHabits / habits.length) * 100) : 0;

    if (isLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-bg p-4">
                <div className="text-zinc-400">Loading habits...</div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-bg p-4">
                <div className="text-red-400">Failed to load habits.</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-bg">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-8">
                {/* HEADER */}
                <section className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-txt">Today</h1>

                        <p className="mt-2 text-zinc-400">Complete your daily check-in.</p>
                    </div>

                    {/* STATS */}
                    <div className="flex flex-col gap-3 rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-400">Progress</p>

                                <h2 className="mt-1 text-2xl font-bold text-txt">
                                    {completedHabits}/{habits.length}
                                </h2>
                            </div>

                            <div className="text-right">
                                <p className="text-sm text-zinc-400">Completion</p>

                                <h2 className="mt-1 text-2xl font-bold text-emerald-400">{completionPercentage}%</h2>
                            </div>
                        </div>

                        {/* PROGRESS BAR */}
                        <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                            <div
                                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                                style={{
                                    width: `${completionPercentage}%`,
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* HABITS */}
                <section className="flex flex-col gap-4">
                    {habits.length === 0 ? (
                        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center">
                            <h2 className="text-lg font-semibold text-txt">No habits yet</h2>

                            <p className="mt-2 text-sm text-zinc-400">Create habits to start tracking your consistency.</p>
                        </div>
                    ) : (
                        habits.map((habit) => {
                            const habitId = String(habit.id);

                            return (
                                <HabitRow
                                    key={habitId}
                                    habit={habit}
                                    value={values[habitId] ?? getDefaultValue(habit.habit_type)}
                                    onChange={(value) => handleHabitValueChange(habit, value)}
                                />
                            );
                        })
                    )}
                </section>
            </div>
        </main>
    );
}
