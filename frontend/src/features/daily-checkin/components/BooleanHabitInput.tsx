interface BooleanHabitInputProps {
    value: boolean;
    onChange: (value: boolean) => void;
}

export default function BooleanHabitInput({value, onChange}: BooleanHabitInputProps) {
    return (
        <button
            type="button"
            onClick={() => onChange(!value)}
            className={`flex h-12 items-center justify-center rounded-2xl border transition-all 
        ${value ? "border-emerald-500 bg-emerald-500 text-white" : "border-zinc-700 bg-zinc-900"}`}
        >
            {value ? "✓" : ""}
        </button>
    );
}
