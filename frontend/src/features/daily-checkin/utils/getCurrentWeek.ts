import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export interface WeekDay {
    date: string;
    shortLabel: string;
}

export function getCurrentWeek(): WeekDay[] {

    const start = dayjs().startOf("week");

    return Array.from({length: 7,}).map((_, index) => {

        const day = start.add(index, "day");

        return {
            date: day.format("YYYY-MM-DD"),
            shortLabel: day.format("ddd"),
        };
    });
}