import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

export default function AppLayout(){
  return(
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}