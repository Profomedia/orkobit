import type {
  Habit,
} from "../types/daily-checkin.types";

import BooleanHabitInput from "./BooleanHabitInput";
import NumberHabitInput from "./NumberHabitInput";
import TimerHabitInput from "./TimerHabitInput";


interface HabitInputRendererProps {
  habit: Habit;

  value: boolean | number;

  onChange: (
    value: boolean | number,
  ) => void;
}


export default function HabitInputRenderer({
  habit,
  value,
  onChange,
}: HabitInputRendererProps) {

  switch (
  habit.habit_type
  ) {

    case "boolean":

      return (
        <BooleanHabitInput
          value={Boolean(value)}
          onChange={onChange}
        />
      );

    case "number":

      return (
        <NumberHabitInput
          value={Number(value)}
          onChange={onChange}
        />
      );

    case "timer":

      return (
        <TimerHabitInput
          value={Number(value)}
          onChange={onChange}
        />
      );

    default:

      return null;
  }
}