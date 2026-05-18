import { useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm";

import { registerUser } from "../services/authService";

export default function RegisterPage() {  

  const navigate = useNavigate();

  const handleRegister = async (
    data: {
      username: string;
      email?: string;
      password: string;
      password2?: string;
    }
  ) => {

    try {

      await registerUser({
        username: data.username,
        email: data.email || "",
        password: data.password,
        password2: data.password2 || "",
      });

      navigate("/login");

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <main className="h-screen bg-[url('/pngs/register-bg.jpg')] bg-cover bg-center relative w-screen left-1/2 -translate-x-1/2">

      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <AuthForm mode="register" onSubmit={handleRegister} />
      </div>

    </main>
  );
}