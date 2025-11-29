"use client";

import Href from "../components/Href";
import PrimaryButton from "../components/PrimaryButton";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ShareIcon from '@mui/icons-material/Share';
import Alert from "@mui/material/Alert";
import { useState } from "react";

export default function About() {
    const [infoMessage, setInfoMessage] = useState<string | null>(null);

    const exportConfiguration = () => {
        const existingJson = localStorage.getItem("shows");
        const showStorage = existingJson ? JSON.parse(existingJson) : { showIds: [] };

        const blob = new Blob([JSON.stringify(showStorage, null, 2)], {
            type: "application/json",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "tv-show-watcher-configuration.json";
        link.click();

        URL.revokeObjectURL(url); // optional cleanup
    };

    const importConfiguration = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";

        input.onchange = async (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (!file) return;

            try {
                const text = await file.text();
                const parsed = JSON.parse(text);

                if (!parsed || !Array.isArray(parsed.showIds)) {
                    alert("Invalid file format.");
                    return;
                }

                localStorage.setItem("shows", JSON.stringify(parsed));
                setInfoMessage("Configuration imported successfully!");
            } catch (err) {
                console.error(err);
                alert("Failed to import configuration.");
            }
        };

        input.click();
    };

    function getConfig() {
        const existingJson = localStorage.getItem("shows");
        const showStorage = existingJson ? JSON.parse(existingJson) : { showIds: [] };
        return showStorage;
    }

    function exportConfigToUrl() {
        const config = getConfig();
        const json = JSON.stringify(config);
        const encoded = encodeURIComponent(btoa(json));
        return `${window.location.origin}${process.env.BASE_PATH || ""}/share?config=${encoded}`;
    }

    function copyToClipboard() {
        const exportUrl = exportConfigToUrl();
        navigator.clipboard.writeText(exportUrl);
        setInfoMessage("Configuration URL copied to clipboard!");
    }

    return (
        <>
            <div className="font-sans font-medium text-[16px] leading-[26px] flex-none order-1 gap-4 flex flex-col">
                <p>Welcome to <strong>TV Show Watcher</strong>!</p>
                <p>With this application you can see upcoming episodes of your favorite TV shows in one place. Simply add the shows you like in <Href href={`${process.env.BASE_PATH || ""}${"/search"}`}>Search</Href> and then navigate to the <Href href={`${process.env.BASE_PATH || ""}${"/"}`}>Home page</Href>.</p>
                <p>API provided by <Href href="https://www.tvmaze.com/api">TV Maze</Href>.</p>
                <p>You can use the below buttons to export or import your TV shows:</p>
                <div className="gap-4 flex">
                    <PrimaryButton className="self-start gap-2" onClick={exportConfiguration}><FileDownloadIcon /> Export File</PrimaryButton>
                    <PrimaryButton className="self-start gap-2" onClick={importConfiguration}><FileUploadIcon /> Import File</PrimaryButton>
                </div>
                <p>Alternatively you can share you configuration through an URL:</p>
                <PrimaryButton className="self-start gap-2" onClick={copyToClipboard}><ShareIcon /> Copy URL to clipboard</PrimaryButton>
                {infoMessage && <Alert severity="success">{infoMessage}</Alert>}
            </div>
        </>
    );
}
