interface TimerHabitInputProps {
    value: number;

    onChange: (value: number) => void;
}

export default function TimerHabitInput({value, onChange}: TimerHabitInputProps) {
    const quickOptions = [5, 15, 30, 60, 120];

    return (
        <div className="flex flex-wrap gap-2">
            {quickOptions.map((minutes) => (
                <button
                    key={minutes}
                    type="button"
                    onClick={() => onChange(minutes)}
                    className={`
            rounded-xl border px-4 py-2 text-sm transition-all
            ${value === minutes ? "border-emerald-500 bg-emerald-500 text-white" : "border-zinc-700 bg-zinc-900"}
          `}
                >
                    {minutes}m
                </button>
            ))}
        </div>
    );
}
