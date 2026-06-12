import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export interface WeekDay {
    date: string;
    shortLabel: string;
}

export function getWeek(
    weekOffset = 0,
): WeekDay[] {

    const start = dayjs()
        .add(weekOffset, "week")
        .startOf("week");

    return Array.from({length: 7,}, (_, index) => {

        const day = start.add(index, "day");

        return {
            date: day.format("YYYY-MM-DD"),
            shortLabel: day.format("ddd"),
        };
    });
}