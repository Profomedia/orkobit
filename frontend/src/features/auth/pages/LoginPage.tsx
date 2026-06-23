import {useNavigate} from "react-router-dom";

import AuthForm from "../components/AuthForm";

import {useAuthStore} from "../store/authStore";

import {loginUser} from "../services/authService";
import { getApiError } from "@/utils/getApiError";

export default function LoginPage() {
    const navigate = useNavigate();

    const setTokens = useAuthStore((state) => state.setTokens);

    const handleLogin = async (data: {
        username: string;
        password: string;
    }) => {
        console.log("LOGIN START");

        try {
            const response = await loginUser(data);

            console.log("LOGIN SUCCESS", response);

            setTokens(response.access, response.refresh);

            navigate("/");
        } catch (error) {
            console.log("LOGIN FAILED", error);

            throw new Error(getApiError(error));
        }
    };

    
    return (
        <main className="h-screen bg-[url('/pngs/log-in-bg.jpg')] bg-cover bg-center relative w-screen left-1/2 -translate-x-1/2">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/80"></div>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <AuthForm mode="login" onSubmit={handleLogin} />
            </div>
        </main>
    );
}
