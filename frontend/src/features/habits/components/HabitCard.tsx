import type { ReactNode } from "react";
import type { Habit, HabitType } from "@/types/habit.types";

import {
    Clock3,
    Hash,
    Star,
    ToggleLeft,
    ArrowRight,
    Archive,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

interface HabitCardProps {
    habit: Habit;
}

const habitTypeIcons: Record<HabitType, ReactNode> = {
    number: <Hash className="h-5 w-5" />,
    rating: <Star className="h-5 w-5" />,
    timer: <Clock3 className="h-5 w-5" />,
    boolean: <ToggleLeft className="h-5 w-5" />,
};

export default function HabitCard({ habit }: HabitCardProps) {
    const navigate = useNavigate();

    const color = habit.color ?? "#7c5cff";

    function handleNavigate() {
        navigate(`/habit/${habit.id}`);
    }

    return (
        <button
            type="button"
            onClick={handleNavigate}
            className="
                group relative flex min-h-[240px]
                w-full flex-col overflow-hidden
                rounded-3xl border border-zinc-800
                bg-zinc-800 p-6 text-left
                transition-all duration-300
                hover:-translate-y-1
                hover:border-zinc-700
                hover:shadow-2xl
                focus:outline-none
                focus:ring-2
                focus:ring-zinc-600
            "
        >
            {/* subtle glow */}
            <div
                className="
                    absolute -right-10 -top-10
                    h-32 w-32 rounded-full
                    opacity-10 blur-3xl
                    transition-opacity duration-300
                    group-hover:opacity-20
                "
                style={{
                    backgroundColor: color,
                }}
            />

            <div className="relative z-10 flex h-full flex-col">
                {/* Header */}

                <div className="flex items-start justify-between">
                    <div
                        className="
                            flex h-12 w-12 items-center
                            justify-center rounded-2xl
                            text-white shadow-lg
                            transition-transform duration-300
                            group-hover:scale-105
                        "
                        style={{
                            backgroundColor: color,
                        }}
                    >
                        {habitTypeIcons[habit.habit_type]}
                    </div>

                    {habit.is_archived && (
                        <div
                            className="
                                flex items-center gap-1
                                rounded-full bg-red-500/10
                                px-2 py-1 text-xs
                                font-medium text-red-400
                            "
                        >
                            <Archive className="h-3 w-3" />
                            Archived
                        </div>
                    )}
                </div>

                {/* Title */}

                <div className="mt-6">
                    <h2
                        className="
                            line-clamp-1 text-xl
                            font-semibold tracking-tight
                            text-white
                        "
                    >
                        {habit.name}
                    </h2>

                    <p
                        className="
                            mt-2 line-clamp-2
                            text-sm leading-relaxed
                            text-zinc-400
                        "
                    >
                        {habit.description || "No description provided."}
                    </p>
                </div>

                {/* Target */}

                <div className="mt-8">
                    <p
                        className="
                            text-xs uppercase
                            tracking-[0.2em]
                            text-zinc-500
                        "
                    >
                        Target
                    </p>

                    <div className="mt-2 flex items-end gap-2">
                        <span
                            className="
                                text-3xl font-bold
                                tracking-tight text-white
                            "
                        >
                            {Number(habit.target_value) ?? 1}
                        </span>

                        {habit.unit && (
                            <span className="pb-1 text-zinc-400">
                                {habit.unit}
                            </span>
                        )}
                    </div>

                    
                </div>

                {/* Footer */}

                <div className="mt-auto flex items-center justify-between pt-8">
                    <span
                        className="
                            rounded-full bg-zinc-900
                            px-3 py-1 text-xs
                            font-medium capitalize
                            text-zinc-400
                        "
                    >
                        {habit.frequency_type.replace("_", " ")}
                    </span>

                    <ArrowRight
                        className="
                            h-5 w-5 text-zinc-500
                            transition-all duration-200
                            group-hover:translate-x-1
                            group-hover:text-white cursor-pointer
                        "
                    />
                </div>
            </div>
        </button>
    );
}
