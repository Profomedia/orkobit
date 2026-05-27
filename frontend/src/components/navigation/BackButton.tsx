import {ArrowLeft,} from "lucide-react";
import {useNavigate,} from "react-router-dom";

interface BackButtonProps {
    fallbackTo?: string;
    label?: string;
}

export default function BackButton({
    fallbackTo = "/",
    label = "Back",
}: BackButtonProps) {

    const navigate = useNavigate();

    const handleBack = () => {

        if (window.history.length > 1) {
            navigate(-1);
            return;
        }

        navigate(fallbackTo);
    };

    return (
        <button
            type="button"
            onClick={handleBack}
            className="
                inline-flex items-center gap-2
                rounded-xl border border-zinc-800
                bg-zinc-900
                px-3 py-2
                text-sm text-zinc-200
                transition-all
                hover:border-zinc-700
                hover:bg-zinc-800
                active:scale-[0.98]
            "
        >
            <ArrowLeft size={16} />

            <span>{label}</span>
        </button>
    );
}