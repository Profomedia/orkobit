import {Link,} from "react-router-dom";

import logo from "/pngs/logo.png";

import UserSidebar from "./UserSidebar";

export default function Header() {

    const getOrdinal = (n: number) => {

        if (n > 3 && n < 21) {
            return "th";
        }

        switch (n % 10) {

            case 1:
                return "st";

            case 2:
                return "nd";

            case 3:
                return "rd";

            default:
                return "th";
        }
    };

    const today = new Date();

    const day = today.getDate();

    const weekday = today.toLocaleDateString(
        "en-GB",
        {
            weekday: "short",
        },
    );

    const month = today.toLocaleDateString(
        "en-GB",
        {
            month: "long",
        },
    );

    const formattedDate = `${weekday} ${day}${getOrdinal(day)} ${month}`;

    return (
        <header
            className="
                sticky top-0 left-0 z-50
                border-b border-zinc-800
                bg-h-bg/95
                backdrop-blur
            "
        >
            <div
                className="
                    mx-auto flex h-14
                    max-w-8xl items-center justify-between
                    px-6
                "
            >

                {/* Left */}

                <Link to="/">
                    <img
                        src={logo}
                        alt="Orkobit Logo"
                        className="h-8 w-auto"
                    />
                </Link>

                {/* Center */}

                <div className="text-sm text-txt-lt">
                    {formattedDate}
                </div>

                {/* Right */}

                <div className="flex items-center gap-6">

                    <nav className="flex items-center gap-4">

                        <Link
                            to="/habit"
                            className="
                                text-sm text-txt-lt
                                transition
                                hover:text-txt
                            "
                        >
                            Habits
                        </Link>

                        <Link
                            to="/today"
                            className="
                                text-sm text-txt-lt
                                transition
                                hover:text-txt
                            "
                        >
                            Today
                        </Link>

                    </nav>

                    <UserSidebar />

                </div>

            </div>
        </header>
    );
}