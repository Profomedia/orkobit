const filters = ["All", "Active", "Completed"] as const;

export default function HabitFilters() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
                <button
                    key={filter}
                    className="
            rounded-xl border border-zinc-800
            bg-zinc-950 px-4 py-2 text-sm
            text-zinc-300 transition
            hover:border-zinc-700
            hover:text-white
          "
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}
