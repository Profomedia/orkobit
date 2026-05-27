import dayjs from "dayjs";
import {useMemo,} from "react";

import HabitInputRenderer from "../components/HabitInputRenderer";

import {useHabits,} from "@/hooks/useHabits";

import {useDailyCheckinStore,} from "../store/dailyCheckin.store";

import {getCurrentWeek,} from "../utils/getCurrentWeek";
import BackButton from "@/components/navigation/BackButton";
import { Habit, HabitValue } from "@/types/habit.types";

function getDefaultValue(
    habitType: Habit["habit_type"],
): HabitValue {

    switch (habitType) {

        case "checkbox":
            return false;

        case "number":
            return 0;

        case "timer":
            return 0;

        default:
            return false;
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

    const weekDays = getCurrentWeek();

    const completedHabits = useMemo(() => {

        return habits.filter((habit) => {

            const value = getValue(
                String(habit.id),
                dayjs().format("YYYY-MM-DD"),
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
        <main className="mx-auto mt-0 flex w-full max-w-7xl flex-col gap-4 px-4 py-0">

            <section className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-txt">
                        Today
                    </h1>

                    <p className="text-sm text-lite">
                        {completedHabits} / {habits.length} completed
                    </p>
                </div>
                <BackButton />
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

                <div>
                    <h2 className="text-lg font-semibold text-txt">
                        Weekly Progress
                    </h2>

                    <p className="text-sm text-lite">
                        Track consistency across the week
                    </p>
                </div>

            </section>

            <section className="flex flex-col gap-4">

                {habits.map((habit) => (

                    <article
                        key={habit.id}
                        className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                    >

                        <div className="mb-4 flex items-center justify-between">

                            <div className="flex ">

                                <h2 className="font-semibold text-txt">
                                    {habit.name}
                                </h2>
                                <div className="flex">
                                    <button type="button">Prev</button>
                                    <button type="button">Next</button>
                                </div>
                            </div>

                        </div>

                        {/* TODO scale the card when the mouse passes through */}
                        <div className="
                            flex gap-7 md:gap-8 md:justify-center pb-1 px-4 scrollbar-hide
                            overflow-x-auto
                            overflow-visible
                            lg:grid lg:grid-cols-7 lg:overflow-visible
                        ">

                            {weekDays.map((day) => {
                                 const value = getValue(
                                    habit.id,
                                    day.date,
                                    getDefaultValue(habit.habit_type),
                                );

                                const isToday = (
                                    day.date
                                    === dayjs().format("YYYY-MM-DD")
                                );
                                const isFuture = dayjs(day.date)
                                    .startOf("day")
                                    .isAfter(dayjs().startOf("day"));

                                return (
                                    <div
                                        key={day.date}
                                        className={[
                                            "flex min-w-[88px] lg:min-w-0 flex-col items-center gap-3 rounded-2xl border p-3 transition-all duration-300 max-w-20",

                                           isFuture
                                        ? "pointer-events-none opacity-40 border-zinc-800 bg-zinc-950"
                                        : isToday
                                            ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(52,211,153,0.35)]"
                                            : "border-zinc-800 bg-bg"
                                        ].join(" ")}
                                    >

                                        <div className="text-center flex gap-2">

                                            <p className={[
                                                "text-xs font-semibold text-txt",
                                                
                                                isToday
                                                    ? "text-emerald-500 "
                                                    : "text-lite",
                                                ].join(" ")}
                                            >
                                                {dayjs(day.date).format("ddd")}
                                            </p>

                                            <p className="text-xs text-lite">
                                                {dayjs(day.date).format("Do")}
                                            </p>

                                        </div>

                                        <HabitInputRenderer
                                            habit={habit}
                                            date={day.date}
                                            value={value}
                                            onChange={()=> {}}
                                            disabled={isFuture}
                                        />
                                        <div className="border-zinc-600 w-1/2 border-2 rounded-full"></div>
                                    </div>
                                );
                            })}

                        </div>

                    </article>
                ))}

            </section>

        </main>
    );
}