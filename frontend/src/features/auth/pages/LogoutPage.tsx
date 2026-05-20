import {Navigate} from "react-router-dom";

import {useAuthStore} from "../store/authStore";

export default function LogoutPage() {
    const logout = useAuthStore((state) => state.logout);

    logout();

    return <Navigate to="/login" replace />;
}
