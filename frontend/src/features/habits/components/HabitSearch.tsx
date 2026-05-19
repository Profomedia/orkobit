export default function HabitSearch() {
  return (
    <div className="w-full md:max-w-sm">
      <input
        type="text"
        placeholder="Search habits..."
        className="
          w-full rounded-xl border border-zinc-800
          bg-zinc-950 px-4 py-2 text-sm
          text-zinc-100 placeholder:text-zinc-500
          outline-none transition
          focus:border-zinc-700
          focus:ring-1 focus:ring-zinc-700
        "
      />
    </div>
  );
}