import {Navigate} from "react-router-dom";

export default function LogoutPage() {
    localStorage.clear();

    return <Navigate to="/login" replace />;
}
