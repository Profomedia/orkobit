import EmptyState from "@/components/ui/EmptyState";

import DashboardSummary from "../components/DashboardSummary";

import {useNavigate} from "react-router-dom";
import { useHabits } from "@/hooks/useHabits";


export default function HomePage() {
    const {data:habits, isLoading, isError} = useHabits()
    
    const navigate = useNavigate();
 
    const isEmpty = habits?.length === 0;

    if (isLoading) {
        return <main className="min-h-screen bg-zinc-950 p-6 text-zinc-100">Loading habits...</main>;
    }

    if (isError) {
        return <main className="min-h-screen bg-zinc-950 p-6 text-red-400">Failed to load habits.</main>;
    }

    return (
        <main className="h-screen bg-bg text-txt overflow-y-hidden">

            <div className="max-w-7xl mx-auto px-6 py-8">
                {isEmpty ? <EmptyState onStart={() => navigate("/habit/new")} /> : <DashboardSummary />}
            </div>
        </main>
    );
}
