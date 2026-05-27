import {useEffect, useState} from "react";

import api from "@/lib/api";

import {USER_URL} from "@/constants/api";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

interface User {
    id: number;

    username: string;

    email?: string;
}

interface UseUserReturn {
    user: User | null;

    loading: boolean;

    error: string | null;
}

// --------------------------------------------------
// HOOK
// --------------------------------------------------

export default function useUser(): UseUserReturn {
    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    // --------------------------------------------------
    // FETCH USER
    // --------------------------------------------------

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(USER_URL);

                setUser(response.data);
            } catch (err) {
                console.error("Failed to load user info", err);

                setError("Failed to load user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // --------------------------------------------------
    // RETURN
    // --------------------------------------------------

    return {
        user,
        loading,
        error,
    };
}
