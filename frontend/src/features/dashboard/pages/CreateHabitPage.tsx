import CreateHabitForm from "@/features/daily-checkin/components/CreateHabitForm";
import {useNavigate} from "react-router-dom";

export default function CreateHabitPage() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-bg text-txt">
            <div className="mx-auto max-w-2xl px-6 py-10">
                <button onClick={() => navigate(-1)} 
                type="button"
                className="mb-6 text-sm opacity-70">
                    ← Back
                </button>

                <div
                    className="
            rounded-2xl
            border
            border-border
            bg-card
            p-6
          "
                >
                    <h1 className="mb-6 text-2xl font-bold">Create Habit</h1>

                    <CreateHabitForm />
                </div>
            </div>
        </main>
    );
}
