import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";

import HabitInputRenderer from "../components/HabitInputRenderer";

import { useHabits } from "@/hooks/useHabits";

import { useDailyCheckinStore } from "../store/dailyCheckin.store";

import { getWeek } from "../utils/getCurrentWeek";
import BackButton from "@/components/navigation/BackButton";
import type { Habit, HabitValue } from "@/types/habit.types";
import { useHabitEntries } from "../hooks/useHabitEntries";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function getDefaultValue(habitType: Habit["habit_type"]): HabitValue {
    switch (habitType) {
        case "boolean":
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
    const navigate = useNavigate()
    const { data: habits = [], isLoading, isError } = useHabits();
    const [weekOffset, setWeekOffset] = useState(0);

    const setValue = useDailyCheckinStore((state) => state.setValue);
    const { data: entries = [] } = useHabitEntries();

    const getValue = useDailyCheckinStore((state) => state.getValue);
    
    useEffect(() => {
        entries.forEach(
            (entry: {
                value_boolean: any;
                value_number: any;
                duration_seconds: any;
                date: string;
                habit: string;
            }) => {
                const value =
                    entry.value_boolean ??
                    entry.value_number ??
                    entry.duration_seconds ??
                    0;

                setValue(entry.date, entry.habit, value);
            },
        );

        // console.log(
        //     "Store after hydration:",
        //     useDailyCheckinStore.getState().values,
        // );
    }, [entries, setValue]);

    // console.log("entries", entries);
    // console.log("isArray", Array.isArray(entries));
    // console.log(useDailyCheckinStore.getState().values);
    const weekDays = useMemo(() => getWeek(weekOffset), [weekOffset]);

    const completedHabits = useMemo(() => {
        return habits.filter((habit) => {
            const value = getValue(
                dayjs().format("YYYY-MM-DD"),
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
        <main className="mx-auto mt-0 flex w-full max-w-7xl flex-col gap-4 px-4 py-0">
            <section className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-txt">Today</h1>

                    <p className="text-sm text-lite">
                        {completedHabits} / {habits.length} completed
                    </p>
                </div>
                <BackButton />
            </section>

            <section className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                <div>
                    <h2 className="text-lg font-semibold text-txt">
                        Weekly Progress
                    </h2>

                    <p className="text-sm text-lite">
                        Track consistency across the week
                    </p>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-bg p-1">
                    <button
                        type="button"
                        onClick={() => setWeekOffset((prev) => prev - 1)}
                        className="
            flex h-9 w-9 items-center justify-center
            rounded-lg
            text-zinc-400
            transition-all
            hover:bg-zinc-800
            hover:text-white
        "
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        type="button"
                        onClick={() => setWeekOffset(0)}
                        className="
            rounded-lg
            bg-emerald-500/10
            px-4
            py-2
            text-sm
            font-medium
            text-emerald-400
            transition-all
            hover:bg-emerald-500/20
        "
                    >
                        {weekOffset === 0
                            ? "Current Week"
                            : weekOffset < 0
                              ? `${Math.abs(weekOffset)} Week${Math.abs(weekOffset) > 1 ? "s" : ""} Ago`
                              : `${weekOffset} Week${weekOffset > 1 ? "s" : ""} Ahead`}
                    </button>

                    <button
                        type="button"
                        onClick={() => setWeekOffset((prev) => prev + 1)}
                        className="
            flex h-9 w-9 items-center justify-center
            rounded-lg
            text-zinc-400
            transition-all
            hover:bg-zinc-800
            hover:text-white
        "
                    >
                        <ChevronRight />
                    </button>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                {habits.map((habit) => (
                    <article
                        key={habit.id}
                        className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex justify-between w-full">
                                <h2 className="font-semibold text-txt">
                                    {habit.name}
                                </h2>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(`/habit/${habit.id}`)
                                    }
                                    className="
        rounded-md
        border
        border-zinc-700
        px-4
        py-1
        text-sm
        font-medium
        text-zinc-300
        transition-all
        hover:border-emerald-500
        hover:bg-emerald-500/10
        hover:text-emerald-400
        cursor-pointer
    "
                                >
                                    View Stats
                                </button>
                            </div>
                        </div>

                        {/* TODO scale the card when the mouse passes through */}
                        <div
                            className="
                            flex gap-7 md:gap-8 md:justify-center pb-1 px-4 scrollbar-hide
                            overflow-x-auto
                            overflow-visible
                            lg:grid lg:grid-cols-7 lg:overflow-visible
                        "
                        >
                            {weekDays.map((day) => {
                                const habitCreatedDate = dayjs(
                                    habit.created_at,
                                ).format("YYYY-MM-DD");
                                const existedOnThisDate =
                                    day.date >= habitCreatedDate;

                                if (!existedOnThisDate) {
                                    return (
                                        <div
                                            key={day.date}
                                            className="min-w-[88px] lg:min-w-0"
                                        />
                                    );
                                }
                                const value = getValue(
                                    day.date,
                                    habit.id,
                                    getDefaultValue(habit.habit_type),
                                );

                                const isToday =
                                    day.date === dayjs().format("YYYY-MM-DD");
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
                                                  : "border-zinc-800 bg-bg",
                                        ].join(" ")}
                                    >
                                        <div className="text-center flex gap-2">
                                            <p
                                                className={[
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
                                            onChange={() => {}}
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
