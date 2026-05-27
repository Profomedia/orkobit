import {useEffect, useState,} from "react";

import {Link, useLocation, useNavigate,} from "react-router-dom";

import {User,} from "lucide-react";

import useUser from "@/hooks/useUser";

import {MENU_ITEMS,} from "@/helpers/sidebar_Items";

interface MenuItem {
    label: string;
    path: string;
    icon: React.ElementType;
    isAction?: boolean;
}

export default function UserSidebar() {

    const [isOpen, setIsOpen] = useState(false);

    const {user, loading, error,} = useUser();

    const navigate = useNavigate();

    const location = useLocation();

    // ==================================================
    // ESC CLOSE
    // ==================================================

    useEffect(() => {

        const handleKey = (event: KeyboardEvent) => {

            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener(
            "keydown",
            handleKey,
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKey,
            );
        };
    }, []);

    // ==================================================
    // TOGGLE
    // ==================================================

    const handleToggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    // ==================================================
    // LOGOUT
    // ==================================================

    const handleLogout = () => {
        navigate("/logout");
    };

    // ==================================================
    // STATES
    // ==================================================

    if (loading) {
        return (
            <div className="text-sm text-txt-lt">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-sm text-red-400">
                Error loading user
            </div>
        );
    }

    // ==================================================
    // HELPERS
    // ==================================================

    const getInitials = () => {

        if (!user?.username) {
            return "U";
        }

        return user.username
            .slice(0, 1)
            .toUpperCase();
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const menuItemClass = (path: string) => `
        flex items-center gap-3
        w-full
        px-5 py-4
        text-sm font-medium
        border-b border-zinc-800
        transition-all duration-200
        text-left

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

    // ==================================================
    // UI
    // ==================================================

    return (
        <>
            {/* ================================================== */}
            {/* AVATAR BUTTON */}
            {/* ================================================== */}

            <button
                type="button"
                aria-label="Open user sidebar"
                onClick={handleToggleSidebar}
                className="
                    flex h-10 w-10 items-center justify-center
                    rounded-xl
                    text-txt
                    transition-all
                    hover:scale-110
                "
            >
                <User />
            </button>

            {/* ================================================== */}
            {/* OVERLAY */}
            {/* ================================================== */}

            {isOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar overlay"
                    onClick={handleToggleSidebar}
                    className="
                        fixed inset-0 z-40
                        bg-black/50
                        backdrop-blur-sm
                    "
                />
            )}

            {/* ================================================== */}
            {/* SIDEBAR */}
            {/* ================================================== */}

            <aside
                className={[
                    `
                        fixed top-0 right-0 z-50
                        flex h-screen w-72 flex-col
                        border-l border-zinc-800
                        bg-secondary
                        shadow-2xl

                        transition-transform
                        duration-300
                        ease-in-out
                    `,

                    isOpen
                        ? "translate-x-0"
                        : "translate-x-full",
                ].join(" ")}
            >

                {/* ================================================== */}
                {/* HEADER */}
                {/* ================================================== */}

                <div className="flex justify-end p-4">

                    <button
                        type="button"
                        onClick={handleToggleSidebar}
                        className="
                            flex h-10 w-10 items-center justify-center
                            rounded-lg
                            transition-all
                            hover:bg-zinc-800
                        "
                    >
                        ✕
                    </button>

                </div>

                {/* ================================================== */}
                {/* USER */}
                {/* ================================================== */}

                <div
                    className="
                        flex flex-col items-center
                        px-6 pb-8
                    "
                >

                    <div
                        className="
                            flex h-24 w-24 items-center justify-center
                            rounded-full border-4 border-accent

                            text-3xl font-bold text-accent
                        "
                    >
                        {getInitials()}
                    </div>

                    <div className="mt-5 text-center">

                        <p
                            className="
                                text-xs uppercase tracking-widest
                                text-txt-lt
                            "
                        >
                            Welcome
                        </p>

                        <p
                            className="
                                mt-2 text-lg font-semibold
                                text-accent
                            "
                        >
                            {user?.username || "User"}
                        </p>

                    </div>

                </div>

                {/* ================================================== */}
                {/* MENU */}
                {/* ================================================== */}

                <nav className="flex-1 overflow-y-auto">

                    <ul>

                        {MENU_ITEMS.map((item: MenuItem) => {

                            const Icon = item.icon;

                            // ==========================================
                            // ACTION ITEM
                            // ==========================================

                            if (item.isAction) {

                                return (
                                    <li key={item.label}>

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className={menuItemClass(item.path)}
                                        >

                                            <Icon className="text-lg" />

                                            <span>
                                                {item.label}
                                            </span>

                                        </button>

                                    </li>
                                );
                            }

                            // ==========================================
                            // NORMAL ROUTE
                            // ==========================================

                            return (
                                <li key={item.label}>

                                    <Link
                                        to={item.path}
                                        className={menuItemClass(item.path)}
                                    >

                                        <Icon className="text-lg" />

                                        <span>
                                            {item.label}
                                        </span>

                                    </Link>

                                </li>
                            );
                        })}

                    </ul>

                </nav>

            </aside>
        </>
    );
}