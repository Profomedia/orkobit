import {
    Bell,
    Info,
    LogOut,
    Settings,
} from "lucide-react";


// --------------------------------------------------
// TYPES
// --------------------------------------------------

export interface MenuItem {
    label: string;

    path: string;

    icon: React.ElementType;

    isAction?: boolean;
}


// --------------------------------------------------
// MENU ITEMS
// --------------------------------------------------

export const MENU_ITEMS: MenuItem[] = [

    {
        label: "Notifications",

        path: "/notifications",

        icon: Bell,
    },

    {
        label: "Settings",

        path: "/settings",

        icon: Settings,
    },

    {
        label: "Logout",

        path: "/logout",

        icon: LogOut,

        isAction: true,
    },

    {
        label: "About",

        path: "/about",

        icon: Info,
    },
];