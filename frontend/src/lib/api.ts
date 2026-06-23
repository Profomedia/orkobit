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
// Automatically attach the access token
// to all outgoing authenticated requests.
// --------------------------------------------------

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => Promise.reject(error),
);

// --------------------------------------------------
// RESPONSE INTERCEPTOR
// --------------------------------------------------
// Handles expired access tokens by:
// 1. Attempting token refresh
// 2. Retrying the failed request
// 3. Logging the user out if refresh fails
//
// IMPORTANT:
// Login and refresh endpoints are excluded
// from refresh logic to prevent redirect loops.
// --------------------------------------------------

api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableRequest;

        // --------------------------------------------------
        // CURRENT TOKENS
        // --------------------------------------------------

        const accessToken = localStorage.getItem(ACCESS_TOKEN);

        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        // --------------------------------------------------
        // REQUEST TYPE DETECTION
        // --------------------------------------------------
        // Login failures should return errors
        // to the login form rather than trigger
        // token refresh logic.
        // --------------------------------------------------

        const isLoginRequest =
            originalRequest?.url?.includes("/auth/login/") ?? false;

        const isRefreshRequest =
            originalRequest?.url?.includes("/auth/refresh/") ?? false;

        // --------------------------------------------------
        // SHOULD ATTEMPT TOKEN REFRESH?
        // --------------------------------------------------

        const shouldRefresh =
            error.response?.status === 401 &&
            !!accessToken &&
            !!refreshToken &&
            !originalRequest._retry &&
            !isLoginRequest &&
            !isRefreshRequest;

        // --------------------------------------------------
        // NORMAL ERROR
        // --------------------------------------------------

        if (!shouldRefresh) {
            return Promise.reject(error);
        }

        // --------------------------------------------------
        // MARK REQUEST AS RETRIED
        // --------------------------------------------------

        originalRequest._retry = true;

        try {
            // --------------------------------------------------
            // REQUEST NEW ACCESS TOKEN
            // --------------------------------------------------

            const response = await axios.post<RefreshResponse>(
                REFRESH_URL,
                {
                    refresh: refreshToken,
                },
            );

            const newAccessToken = response.data.access;

            // --------------------------------------------------
            // SAVE NEW ACCESS TOKEN
            // --------------------------------------------------

            localStorage.setItem(
                ACCESS_TOKEN,
                newAccessToken,
            );

            // --------------------------------------------------
            // UPDATE FAILED REQUEST
            // --------------------------------------------------

            originalRequest.headers.set(
                "Authorization",
                `Bearer ${newAccessToken}`,
            );

            // --------------------------------------------------
            // RETRY ORIGINAL REQUEST
            // --------------------------------------------------

            return api(originalRequest);

        } catch (refreshError) {
            // --------------------------------------------------
            // REFRESH FAILED
            // --------------------------------------------------
            // User session is no longer valid.
            // Force logout and return to login.
            // --------------------------------------------------

            console.error(
                "Token refresh failed:",
                refreshError,
            );

            localStorage.removeItem(ACCESS_TOKEN);

            localStorage.removeItem(REFRESH_TOKEN);

            window.location.href = "/login";

            return Promise.reject(refreshError);
        }
    },
);

export default api;