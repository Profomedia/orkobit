import {create} from "zustand";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;

    setTokens: (access: string, refresh: string) => void;

    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: localStorage.getItem("access"),
    refreshToken: localStorage.getItem("refresh"),

    isAuthenticated: !!localStorage.getItem("access"),

    setTokens: (access, refresh) => {
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        set({
            accessToken: access,
            refreshToken: refresh,
            isAuthenticated: true,
        });
    },

    logout: () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        set({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
        });
    },
}));
