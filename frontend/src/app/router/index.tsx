import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "@/features/dashboard/pages/HomePage";
import HabitPage from "@/features/habits/pages/HabitPage";

import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import LogoutPage from "@/features/auth/pages/LogoutPage";

import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

import NotFoundPage from "@/components/feedback/NotFoundPage";

export default function AppRouter() {

  return (
    <BrowserRouter>

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

        {/* Public Routes */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/logout"
          element={<LogoutPage />}
        />

        {/* 404 */}

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}