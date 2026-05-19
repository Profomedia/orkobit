import Header from "@/components/layout/Header";

import EmptyState from "@/components/ui/EmptyState";

import DashboardSummary from "../components/DashboardSummary";

import { useNavigate } from "react-router-dom";

interface HomePageProps {
  streaks?: unknown[];
}

export default function HomePage({
  streaks = [],
}: HomePageProps) {

  const navigate = useNavigate();

  const isEmpty =
    streaks.length === 0;

  return (
    <main className="h-screen bg-bg text-txt overflow-y-hidden">

      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {isEmpty ? (

          <EmptyState
            onStart={() =>
              navigate("/habit/new")
            }
          />

        ) : (

          <DashboardSummary />

        )}

      </div>

    </main>
  );
}