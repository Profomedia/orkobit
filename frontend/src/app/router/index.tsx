import {Routes, Route} from "react-router-dom";

import HomePage from "@/features/dashboard/pages/HomePage";
import HabitPage from "@/features/habits/pages/HabitPage";

import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import LogoutPage from "@/features/auth/pages/LogoutPage";

import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

import NotFoundPage from "@/components/feedback/NotFoundPage";
import HabitDetailPage from "@/features/habits/pages/HabitDetailPage";

import TodayPage from "@/features/daily-checkin/pages/TodayPage";
import CreateHabitPage from "@/features/dashboard/pages/CreateHabitPage";

export default function AppRouter() {
    return (
        <Routes>
            {/* Protected Routes */}

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/habit"
                element={
                    <ProtectedRoute>
                        <HabitPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/habit/new"
                element={
                    <ProtectedRoute>
                        <CreateHabitPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/today"
                element={
                    <ProtectedRoute>
                        <TodayPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/habits/:uuid"
                element={
                    <ProtectedRoute>
                        <HabitDetailPage />
                    </ProtectedRoute>
                }
            />

            {/* Public Routes */}

            <Route path="/login" element={<LoginPage />} />

            <Route path="/register" element={<RegisterPage />} />

            <Route path="/logout" element={<LogoutPage />} />

            {/* 404 */}

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
