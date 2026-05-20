interface NumberHabitInputProps {
    value: number;

    onChange: (value: number) => void;
}

export default function NumberHabitInput({value, onChange}: NumberHabitInputProps) {
    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={() => onChange(Math.max(0, value - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900"
            >
                -
            </button>

            <div className="min-w-[60px] text-center text-lg font-semibold">{value}</div>

            <button
                type="button"
                onClick={() => onChange(value + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900"
            >
                +
            </button>
        </div>
    );
}
