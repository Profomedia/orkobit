import axios from "axios";

interface ApiErrorResponse {
    detail?: string;
    message?: string;
    error?: string;
    errors?: Record<string, string[]>;
}

export function getApiError(error: unknown): string {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const data = error.response?.data;

        if (!data) {
            return "Unable to connect to server";
        }

        if (data.detail) {
            return data.detail;
        }

        if (data.message) {
            return data.message;
        }

        if (data.error) {
            return data.error;
        }

        if (data.errors) {
            const firstError = Object.values(data.errors)[0];

            if (Array.isArray(firstError) && firstError.length > 0) {
                return firstError[0];
            }
        }

        return "Request failed";
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Something went wrong";
}