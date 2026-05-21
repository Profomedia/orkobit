import type {Habit,} from "../types/daily-checkin.types";

import BooleanHabitInput from "./BooleanHabitInput";
import NumberHabitInput from "./NumberHabitInput";
import TimerHabitInput from "./TimerHabitInput";

interface HabitInputRendererProps {
    habit: Habit;
}

export default function HabitInputRenderer({
    habit,
}: HabitInputRendererProps) {

    switch (habit.habit_type) {

        case "boolean":
            return (
                <BooleanHabitInput
                    habitId={habit.id}
                />
            );

        case "number":
            return (
                <NumberHabitInput
                    habitId={habit.id}
                />
            );

        case "timer":
            return (
                <TimerHabitInput
                    habitId={habit.id}
                />
            );

        default:
            return null;
    }
}