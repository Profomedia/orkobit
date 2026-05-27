

import { Habit, HabitValue} from "@/types/habit.types";
import BooleanHabitInput from "./BooleanHabitInput";
import NumberHabitInput from "./NumberHabitInput";
import TimerHabitInput from "./TimerHabitInput";

interface HabitInputRendererProps {
    habit: Habit;

    value: HabitValue;

    date: string;

    disabled?: boolean;

    onChange: (
        value: HabitValue,
    ) => void;
}

export default function HabitInputRenderer({
    habit,
    date,
    disabled = false,
}: HabitInputRendererProps) {

    switch (habit.habit_type) {

        case "checkbox":
            return (
                <BooleanHabitInput
                    habitId={habit.id}
                    date={date}
                    disabled={disabled}
                />
            );

        case "number":
            return (
                <NumberHabitInput
                    habitId={habit.id}
                    date={date}
                    disabled={disabled}
                />
            );

        case "timer":
            return (
                <TimerHabitInput
                    habitId={habit.id}
                    date={date}
                    disabled={disabled}
                />
            );

        default:
            return null;
    }
}