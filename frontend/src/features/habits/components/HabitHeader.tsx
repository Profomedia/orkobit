import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function HabitHeader() {
  const navigate = useNavigate()
  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Habits
        </h1>

        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          Track your consistency daily.
        </p>
      </div>

      <div className="flex">

      <Button 
      onClick={()=> navigate("/today")}
      className="gap-2 self-start text-sm hover:border hover:border-zinc-500 text-txt cursor-pointer !bg-bg">
        {/* <Plus className="h-4 w-4"  /> */}
        Fill Daily Data
      </Button>
      </div>
    </section>
  );
}