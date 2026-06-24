import { Toaster as HotToaster } from "react-hot-toast";

export default function Toaster() {
    return (
        <HotToaster
            position="top-right"
            toastOptions={{
                duration: 5000,
                style: {
                    background: "#18181b",
                    color: "#ffffff",
                    border: "1px solid #27272a",
                    borderRadius: "12px",
                },
                success: {
                    iconTheme: {
                        primary: "#22c55e",
                        secondary: "#ffffff",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#ef4444",
                        secondary: "#ffffff",
                    },
                },
            }}
        />
    );
}
