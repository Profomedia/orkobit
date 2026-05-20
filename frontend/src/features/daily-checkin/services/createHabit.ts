import api from "@/lib/api";
import {CreateHabitDto, Habit} from "../types/habit";

export async function createHabit(data: CreateHabitDto): Promise<Habit> {
    console.log("API PAYLOAD:", data);

    const response = await api.post<Habit>("/habits/", data);

    return response.data;
}
