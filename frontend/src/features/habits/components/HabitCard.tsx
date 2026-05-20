import {Habit, HabitType} from "@/features/daily-checkin/types/daily-checkin.types";
import {Check, Clock3, Hash, Star, ToggleLeft} from "lucide-react";

import {useNavigate} from "react-router-dom";

interface HabitCardProps {
    habit: Habit;
}

const habitTypeIcons: Record<HabitType, React.ReactNode> = {
    number: <Hash className="h-4 w-4" />,

    timer: <Clock3 className="h-4 w-4" />,

    boolean: <ToggleLeft className="h-4 w-4" />,
};

export default function HabitCard({habit}: HabitCardProps) {
    const navigate = useNavigate();

    function handleNavigate() {
        navigate(`/habits/${habit.id}`);
    }

    return (
        <article
            onClick={handleNavigate}
            className="
        group relative cursor-pointer
        overflow-hidden rounded-3xl
        border border-zinc-800
        bg-gradient-to-b from-zinc-900 to-zinc-950
        p-5 transition-all duration-300
        hover:-translate-y-1
        hover:border-zinc-700
        hover:shadow-2xl hover:shadow-black/20
      "
        >
            {/* Top Accent */}

            <div
                className="absolute inset-x-0 top-0 h-1"
                style={{
                    backgroundColor: habit.color,
                }}
            />

            {/* Header */}

            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                        {/* Icon */}

                        <div
                            className="
                flex h-10 w-10 items-center
                justify-center rounded-2xl
                border bg-zinc-900 text-zinc-300
              "
                            style={{
                                borderColor: habit.color,
                                backgroundColor: `${habit.color}15`,
                            }}
                        >
                            {habitTypeIcons[habit.habit_type]}
                        </div>

                        {/* Title */}

                        <div className="min-w-0">
                            <h2
                                className="
                  truncate text-lg font-semibold
                  tracking-tight text-white
                "
                            >
                                {habit.name}
                            </h2>

                            <div
                                className="
                  mt-1 inline-flex items-center
                  rounded-full border border-zinc-800
                  bg-zinc-900 px-2.5 py-1
                  text-xs font-medium capitalize
                  text-zinc-400
                "
                            >
                                {habit.habit_type}
                            </div>
                        </div>
                    </div>

                    {/* Description */}

                    <p
                        className="
              mt-4 line-clamp-2 text-sm
              leading-relaxed text-zinc-400
            "
                    >
                        {habit.description || "No description provided."}
                    </p>
                </div>

                {/* Color Dot */}

                <div
                    className="
            mt-1 h-3 w-3 rounded-full
            ring-4 ring-zinc-950
          "
                    style={{
                        backgroundColor: habit.color,
                    }}
                />
            </div>

            {/* Footer */}

            <div
                className="
          mt-6 flex items-center
          justify-between border-t
          border-zinc-800 pt-4
        "
            >
                {/* Target */}

                <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <span>Target:</span>

                    <span className="font-medium text-zinc-300">
                        {habit.target_value}

                        {habit.unit && ` ${habit.unit}`}
                    </span>
                </div>

                {/* CTA */}

                <div
                    className="
            rounded-2xl bg-white px-4 py-2
            text-sm font-semibold text-zinc-950
            transition-all duration-200
            group-hover:scale-[1.03]
            group-hover:bg-zinc-200
          "
                >
                    Open
                </div>
            </div>
        </article>
    );
}
