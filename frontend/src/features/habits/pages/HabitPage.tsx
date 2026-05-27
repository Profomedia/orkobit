import {useHabits} from "@/hooks/useHabits";
import HabitCard from "../components/HabitCard";
import HabitHeader from "../components/HabitHeader";
import HabitSearch from "../components/HabitSearch";
import HabitFilters from "../components/HabitFilters";

export default function HabitPage() {
    const {data: habits, isLoading, isError} = useHabits();

    console.log(habits);
    if (isLoading) {
        return <main className="min-h-screen bg-zinc-950 p-6 text-zinc-100">Loading habits...</main>;
    }

    if (isError) {
        return <main className="min-h-screen bg-zinc-950 p-6 text-red-400">Failed to load habits.</main>;
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-4 sm:p-6 lg:p-8">
                <HabitHeader />

                <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
                    <HabitSearch />

                    <HabitFilters />
                </div>

                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {habits?.map((habit) => (
                        <HabitCard key={habit.id} habit={habit} />
                    ))}
                </section>
            </div>
        </main>
    );
}
