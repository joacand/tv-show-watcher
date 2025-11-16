"use client";

import PrimaryButton from "../components/PrimaryButton";

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
            alert("Configuration imported successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to import configuration.");
        }
    };

    input.click();
};

export default function About() {
    return (
        <>
            <div className="font-sans font-medium text-[16px] leading-[26px] text-black flex-none order-1 gap-4 flex flex-col">
                <p>API provided by <a href="https://www.tvmaze.com/api">TV Maze</a>.</p>
                <p>You can use the below buttons to export or import a configuration.</p>
                <div className="gap-4 flex">
                    <PrimaryButton className="self-start" onClick={exportConfiguration}>Export</PrimaryButton>
                    <PrimaryButton className="self-start" onClick={importConfiguration}>Import</PrimaryButton>
                </div>
            </div>
        </>
    );
}
