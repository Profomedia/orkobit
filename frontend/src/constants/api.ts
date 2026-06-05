export const BASE_URL = import.meta.env.VITE_API_URL || "https://api.orkobit.ororklabs.co.ke/api/v1";

export const LOGIN_URL = `${BASE_URL}/auth/login/`;

export const REFRESH_URL = `${BASE_URL}/auth/refresh/`;

export const REGISTER_URL = `${BASE_URL}/auth/register/`;

export const USER_URL = `${BASE_URL}/auth/me/`;
