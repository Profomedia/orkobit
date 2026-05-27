import axios, {type AxiosError, type InternalAxiosRequestConfig} from "axios";

import {BASE_URL, REFRESH_URL} from "@/constants/api";

import {ACCESS_TOKEN, REFRESH_TOKEN} from "@/constants/auth";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

interface RetryableRequest extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

interface RefreshResponse {
    access: string;
}

// --------------------------------------------------
// AXIOS INSTANCE
// --------------------------------------------------

const api = axios.create({
    baseURL: BASE_URL,
});

// --------------------------------------------------
// REQUEST INTERCEPTOR
// --------------------------------------------------

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    },
);

// --------------------------------------------------
// RESPONSE INTERCEPTOR
// --------------------------------------------------

api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableRequest;

        // --------------------------------------------------
        // HANDLE EXPIRED TOKEN
        // --------------------------------------------------

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem(REFRESH_TOKEN);

            // --------------------------------------------------
            // NO REFRESH TOKEN
            // --------------------------------------------------

            if (!refreshToken) {
                localStorage.removeItem(ACCESS_TOKEN);

                localStorage.removeItem(REFRESH_TOKEN);

                window.location.href = "/login";

                return Promise.reject(error);
            }

            try {
                // --------------------------------------------------
                // REFRESH ACCESS TOKEN
                // --------------------------------------------------

                const response = await axios.post<RefreshResponse>(REFRESH_URL, {
                    refresh: refreshToken,
                });

                const newAccessToken = response.data.access;

                // --------------------------------------------------
                // SAVE NEW TOKEN
                // --------------------------------------------------

                localStorage.setItem(ACCESS_TOKEN, newAccessToken);

                // --------------------------------------------------
                // UPDATE REQUEST HEADER
                // --------------------------------------------------

                originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);

                // --------------------------------------------------
                // RETRY ORIGINAL REQUEST
                // --------------------------------------------------

                return api(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);

                // --------------------------------------------------
                // FORCE LOGOUT
                // --------------------------------------------------

                localStorage.removeItem(ACCESS_TOKEN);

                localStorage.removeItem(REFRESH_TOKEN);

                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    },
);

export default api;
