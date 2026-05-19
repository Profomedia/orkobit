
import { Link } from "react-router-dom";

import logo from "/pngs/logo.png";

import UserSideBar from "./UserSideBar";

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

    const weekday =
        today.toLocaleDateString(
            "en-GB",
            {
                weekday: "short",
            }
        );

    const month =
        today.toLocaleDateString(
            "en-GB",
            {
                month: "long",
            }
        );

    const formattedDate =
        `${weekday} ${day}${getOrdinal(day)} ${month}`;

    return (
        <header className="border-b border-zinc-800 bg-h-bg">

            <div className="max-w-8xl mx-auto px-6 h-14 flex items-center justify-between">

                {/* Left */}

                <img
                    src={logo}
                    alt="Orkobit Logo"
                    className="h-8 w-auto"
                />

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
                                text-sm
                                text-txt-lt
                                hover:text-txt
                                transition
                            "
                        >
                            Habits
                        </Link>

                    </nav>

                    <UserSideBar />

                </div>

            </div>

        </header>
    );
}