import React from "react";
import ReactDOM from "react-dom/client";

import {QueryClientProvider,} from "@tanstack/react-query";

import {BrowserRouter,} from "react-router-dom";

import App from "./App";

import "./styles/index.css";

import {queryClient,} from "./lib/react-query";
import Toaster from "./components/ui/Toaster";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
                <Toaster />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
);