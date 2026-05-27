import {useEffect, useState,} from "react";

import type {ReactNode,} from "react";

import {Navigate,} from "react-router-dom";

import {jwtDecode,} from "jwt-decode";

import api from "@/lib/api";

import {
    ACCESS_TOKEN,
    REFRESH_TOKEN,
} from "@/constants/auth";

import {
    REFRESH_URL,
} from "@/constants/api";

interface JwtPayload {
    exp: number;
}

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {

    const [
        isAuthorized,
        setIsAuthorized,
    ] = useState<boolean | null>(null);

    useEffect(() => {

        const refreshToken = async () => {

            const refresh = localStorage.getItem(
                REFRESH_TOKEN,
            );

            if (!refresh) {
                setIsAuthorized(false);

                return;
            }

            try {

                const response = await api.post(
                    REFRESH_URL,
                    {
                        refresh,
                    },
                );

                localStorage.setItem(
                    ACCESS_TOKEN,
                    response.data.access,
                );

                setIsAuthorized(true);

            } catch (error) {

                console.error(
                    "Token refresh failed:",
                    error,
                );

                localStorage.removeItem(
                    ACCESS_TOKEN,
                );

                localStorage.removeItem(
                    REFRESH_TOKEN,
                );

                setIsAuthorized(false);
            }
        };

        const authenticate = async () => {

            const token = localStorage.getItem(
                ACCESS_TOKEN,
            );

            if (!token) {
                setIsAuthorized(false);

                return;
            }

            try {

                const decoded = jwtDecode<JwtPayload>(
                    token,
                );

                const now = Date.now() / 1000;

                if (decoded.exp < now) {

                    await refreshToken();

                    return;
                }

                setIsAuthorized(true);

            } catch (error) {

                console.error(
                    "Invalid token:",
                    error,
                );

                localStorage.removeItem(
                    ACCESS_TOKEN,
                );

                localStorage.removeItem(
                    REFRESH_TOKEN,
                );

                setIsAuthorized(false);
            }
        };

        authenticate();

    }, []);

    if (isAuthorized === null) {

        return (
            <div
                className="
                    flex min-h-screen items-center
                    justify-center
                    text-sm text-zinc-400
                "
            >
                🔐 Verifying access...
            </div>
        );
    }

    if (!isAuthorized) {
        return <Navigate to="/login" replace />;
    }

    return children;
}