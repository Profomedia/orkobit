import api from "@/lib/api";

export async function getHabitEntries() {
    const response = await api.get("/habit-entries/");
    return response.data;
}