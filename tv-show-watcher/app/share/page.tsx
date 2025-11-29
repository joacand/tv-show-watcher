"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "../components/PrimaryButton";
import Alert from "@mui/material/Alert";

export default function SharePage() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter();

    function handleYes() {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get("config");
        if (!encoded) return;

        try {
            const json = atob(decodeURIComponent(encoded));
            localStorage.setItem('shows', json as string);

            router.replace("/");
        } catch (e) {
            setErrorMessage("Failed to import configuration. The URL may be invalid.");
        }
    }

    function handleNo() {
        router.replace("/");
    }

    return (
        <div className="font-sans font-medium text-[16px] leading-[26px] flex-none order-1 gap-4 flex flex-col">
            <h1 className="text-[24px]">Importing Configuration</h1>
            <p>This will overwrite your existing TV show configuration. Are you sure you want to import this configuration?</p>

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <div className="flex gap-2">
                <PrimaryButton className="self-start" onClick={handleYes}>Yes, overwrite my configuration</PrimaryButton>
                <PrimaryButton className="self-start" onClick={handleNo}>No</PrimaryButton>
            </div>
        </div>
    );
}
