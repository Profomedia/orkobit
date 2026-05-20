import {useEffect, useState} from "react";

import {Link, useLocation, useNavigate} from "react-router-dom";

import {User} from "lucide-react";

import useUser from "@/hooks/useUser";

import {MENU_ITEMS} from "@/helpers/sidebar_Items";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

interface MenuItem {
    label: string;
    path: string;
    icon: React.ElementType;
    isAction?: boolean;
}

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

export default function UserSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const {user, loading, error} = useUser();

    const navigate = useNavigate();

    const location = useLocation();

    // --------------------------------------------------
    // CLOSE ON ESC
    // --------------------------------------------------

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKey);

        return () => {
            window.removeEventListener("keydown", handleKey);
        };
    }, []);

    // --------------------------------------------------
    // TOGGLE
    // --------------------------------------------------

    const handleToggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    // --------------------------------------------------
    // LOGOUT
    // --------------------------------------------------

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();

        navigate("/logout");
    };

    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

    if (loading) {
        return <div className="text-sm text-txt-lt">Loading...</div>;
    }

    // --------------------------------------------------
    // ERROR
    // --------------------------------------------------

    if (error) {
        return <div className="text-sm text-red-400">Error loading user</div>;
    }

    // --------------------------------------------------
    // USER INITIALS
    // --------------------------------------------------

    const getInitials = () => {
        if (!user?.username) {
            return "U";
        }

        return user.username.slice(0, 1).toUpperCase();
    };

    // --------------------------------------------------
    // ACTIVE ROUTE
    // --------------------------------------------------

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    // --------------------------------------------------
    // MENU STYLES
    // --------------------------------------------------

    const menuItemClass = (path: string) => {
        return `
            flex
            items-center
            gap-3
            px-5
            py-4
            text-sm
            font-medium
            border-b
            border-zinc-800
            transition-all
            duration-200

            ${
                isActive(path)
                    ? `
                        bg-accent
                        text-txt-d
                      `
                    : `
                        text-accent
                        hover:bg-accent
                        hover:text-txt-d
                      `
            }
        `;
    };

    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    return (
        <div>
            {/* -------------------------------------------------- */}
            {/* AVATAR BUTTON */}
            {/* -------------------------------------------------- */}

            <button
                onClick={handleToggleSidebar}
                className="
                    text-xl
                    text-txt
                    hover:scale-110
                    transition-transform
                    cursor-pointer
                "
            >
                <User />
            </button>

            {/* -------------------------------------------------- */}
            {/* OVERLAY */}
            {/* -------------------------------------------------- */}

            {isOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/50
                        backdrop-blur-sm
                        z-40
                    "
                    onClick={handleToggleSidebar}
                />
            )}

            {/* -------------------------------------------------- */}
            {/* SIDEBAR */}
            {/* -------------------------------------------------- */}

            <aside
                className={`
                    fixed
                    top-0
                    right-0
                    h-screen
                    w-72
                    bg-secondary
                    border-l
                    border-zinc-800
                    shadow-2xl
                    z-50

                    transform
                    transition-transform
                    duration-300
                    ease-in-out

                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                `}
            >
                {/* -------------------------------------------------- */}
                {/* CLOSE */}
                {/* -------------------------------------------------- */}

                <div className="flex justify-end p-4">
                    <button
                        onClick={handleToggleSidebar}
                        className="
                            text-txt-lt
                            hover:text-txt
                            transition
                            text-xl
                        "
                    >
                        ✕
                    </button>
                </div>

                {/* -------------------------------------------------- */}
                {/* USER */}
                {/* -------------------------------------------------- */}

                <div
                    className="
                        flex
                        flex-col
                        items-center
                        px-6
                        pb-8
                    "
                >
                    {/* Avatar */}

                    <div
                        className="
                            w-24
                            h-24
                            rounded-full
                            border-4
                            border-accent

                            flex
                            items-center
                            justify-center

                            text-3xl
                            font-bold

                            text-accent
                        "
                    >
                        {getInitials()}
                    </div>

                    {/* Welcome */}

                    <div className="mt-5 text-center">
                        <p
                            className="
                                text-xs
                                uppercase
                                tracking-widest
                                text-txt-lt
                            "
                        >
                            Welcome
                        </p>

                        <p
                            className="
                                mt-2
                                text-lg
                                font-semibold
                                text-accent
                            "
                        >
                            {user?.username || "User"}
                        </p>
                    </div>
                </div>

                {/* -------------------------------------------------- */}
                {/* MENU */}
                {/* -------------------------------------------------- */}

                <nav>
                    <ul>
                        {MENU_ITEMS.map((item: MenuItem) => {
                            const Icon = item.icon;

                            // Logout Action

                            if (item.isAction) {
                                return (
                                    <li
                                        key={item.label}
                                        onClick={handleLogout}
                                        className={`
                                                ${menuItemClass(item.path)}
                                                cursor-pointer
                                            `}
                                    >
                                        <Icon
                                            className="
                                                    text-lg
                                                "
                                        />

                                        <span>{item.label}</span>
                                    </li>
                                );
                            }

                            // Normal Route

                            return (
                                <Link key={item.label} to={item.path}>
                                    <li className={menuItemClass(item.path)}>
                                        <Icon
                                            className="
                                                    text-lg
                                                "
                                        />

                                        <span>{item.label}</span>
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </div>
    );
}
