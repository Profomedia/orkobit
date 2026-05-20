import Button from "@/components/ui/Button";

import useUser from "@/hooks/useUser";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

interface EmptyStateProps {
    onStart: () => void;
}

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

export default function EmptyState({onStart}: EmptyStateProps) {
    const {user, loading, error} = useUser();

    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[70vh]">
                <p className="text-txt-lt">Loading...</p>
            </div>
        );
    }

    // --------------------------------------------------
    // ERROR
    // --------------------------------------------------

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[70vh]">
                <p className="text-red-400">Error loading user</p>
            </div>
        );
    }

    // --------------------------------------------------
    // USERNAME
    // --------------------------------------------------

    const username = user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : "Ororksmith";

    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    return (
        <section className="flex flex-col items-center justify-center h-full text-center gap-4 min-h-[calc(100vh-55px)] ">
            {/* Title */}

            <h1
                className="
                    text-3xl
                    md:text-4xl
                    font-bold
                    text-txt
                    w-full
                    leading-tight
                "
            >
                Start Your First Habit Streak
            </h1>

            {/* Description */}

            <p
                className=" text-txt-lt mt-4 w-full leading-relaxed
                "
            >
                Build discipline. Track consistency. Become <span className="font-semibold text-txt">{username}</span>
            </p>

            {/* Quote */}

            <p
                className="
                    text-accent
                    text-sm
                    mt-6
                    italic
                    w-full
                "
            >
                “I protect my streaks because they represent who I am.”
            </p>

            {/* CTA */}

            <div className="mt-10">
                <Button
                    onClick={onStart}
                    className="
                        w-20 h-20 !rounded-full
                        bg-bg text-white text-4xl font-extrabold
                        flex items-center justify-center
                        shadow-md
                        transition-all duration-300
                        hover:scale-110 hover:bg-lite hover:text-txt-lt hover:cursor-pointer
                        active:scale-95
                    "
                >
                    <span className="leading-none relative top-[-2px] !text-[40px]">+</span>
                </Button>
            </div>
        </section>
    );
}
