import type {Habit} from "../types/daily-checkin.types";

import HabitInputRenderer from "./HabitInputRenderer";

interface HabitRowProps {
    habit: Habit;
    value: boolean | number;
    onChange: (value: boolean | number) => void;
}

export default function HabitRow({habit, value, onChange}: HabitRowProps) {
    return (
        <div className="flex items-center justify-between rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <div>
                <h3 className="text-lg font-semibold">{habit.name}</h3>

                {habit.frequency_type === "weekly_count" && <p className="mt-1 text-sm text-zinc-400">{habit.weekly_target}x this week</p>}
            </div>

            <HabitInputRenderer habit={habit} value={value} onChange={onChange} />
        </div>
    );
}
