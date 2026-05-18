import api from "@/lib/api";

import { LOGIN_URL, REGISTER_URL } from "@/constants/api";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

interface LoginPayload {
    username: string;
    password: string;
}

interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    password2: string;
}

// --------------------------------------------------
// LOGIN
// --------------------------------------------------

export const loginUser = async (data: LoginPayload) => {
    const response = await api.post(LOGIN_URL, data);

    return response.data;
};

// --------------------------------------------------
// REGISTER
// --------------------------------------------------

export const registerUser = async (data: RegisterPayload) => {
    const response = await api.post(REGISTER_URL, data);

    return response.data;
};
