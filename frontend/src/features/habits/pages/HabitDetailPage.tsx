import {useMemo} from "react";

import {useParams} from "react-router-dom";

import {useHabitEntries} from "../../../hooks/useHabitEntries";
import BackButton from "@/components/navigation/BackButton";


function generateYearCalendar(): string[] {
    const currentYear = new Date().getFullYear();

    const startDate = new Date(currentYear, 0, 1);

    const endDate = new Date(currentYear, 11, 31);

    const days: string[] = [];

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        days.push(currentDate.toISOString().split("T")[0]);

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
}

export default function HabitDetailPage() {
    const {uuid} = useParams();

    const {data: entries, isLoading, isError} = useHabitEntries(uuid || "");

    // -----------------------------------
    // YEAR CALENDAR
    // -----------------------------------

    const calendar = useMemo(() => {
        const allDays = generateYearCalendar();

        // -----------------------------------
        // ENTRY LOOKUP MAP
        // -----------------------------------

        const entryMap = new Map<string, boolean>();

        entries?.forEach((entry) => {
            entryMap.set(entry.date, entry.is_completed);
        });

        // -----------------------------------
        // MERGE CALENDAR + ENTRIES
        // -----------------------------------

        return allDays.map((date) => ({
            date,

            completed: entryMap.get(date) || false,
        }));
    }, [entries]);

    if (isLoading) {
        return <main className="p-6 text-white">Loading entries...</main>;
    }

    if (isError) {
        return <main className="p-6 text-red-400">Failed to load entries.</main>;
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="mx-auto max-w-7xl p-6">
                {/* Header */}

                <div
                    className=" flex justify-between
                            rounded-3xl border border-zinc-800
                            bg-zinc-900/60 p-6
                        "
                >
                    <div className="">
                        <h1 className="text-4xl font-bold">Habit Analytics</h1>
                        <p className="mt-2 text-zinc-400">UUID: {uuid}</p>
                    </div>
                <BackButton />
                </div>

                {/* Heatmap */}

                {/* Heatmap */}

                <section
                    className="
                        mt-8 rounded-3xl border
                        border-zinc-800 bg-zinc-900/60
                        p-6
                    "
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold">Year Heatmap</h2>

                            <p className="mt-2 text-sm text-zinc-400">Your yearly consistency.</p>
                        </div>
                    </div>

                    {/* Calendar */}

                    <div className="mt-8 overflow-x-auto">
                        <div className="min-w-max">
                            {/* Month Labels */}

                            <div className="mb-3 flex gap-3 pl-10">
                                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
                                    <div
                                        key={month}
                                        className="
              w-[70px] text-xs
              font-medium text-zinc-500
            "
                                    >
                                        {month}
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                {/* Weekday Labels */}

                                <div
                                    className="
            flex flex-col justify-between
            text-xs text-zinc-500
            pt-1
          "
                                >
                                    <span>Mon</span>

                                    <span>Wed</span>

                                    <span>Fri</span>
                                </div>

                                {/* Heatmap Grid */}

                                <div
                                    className="
            grid grid-flow-col
            grid-rows-7 gap-1
          "
                                >
                                    {calendar.map((day) => (
                                        <div
                                            key={day.date}
                                            title={day.date}
                                            className={`
                h-4 w-4 rounded-[4px]
                transition-all duration-200
                hover:scale-125
                ${day.completed ? "bg-emerald-500" : "bg-zinc-800"}
              `}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}

                    <div
                        className="
      mt-6 flex items-center
      justify-end gap-2 text-xs
      text-zinc-500
    "
                    >
                        <span>Less</span>

                        <div className="h-3 w-3 rounded bg-zinc-800" />

                        <div className="h-3 w-3 rounded bg-emerald-900" />

                        <div className="h-3 w-3 rounded bg-emerald-700" />

                        <div className="h-3 w-3 rounded bg-emerald-500" />

                        <span>More</span>
                    </div>
                </section>
            </div>
        </main>
    );
}
