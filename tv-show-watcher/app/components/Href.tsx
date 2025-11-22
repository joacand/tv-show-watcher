import React from "react";

type HrefProps = {
    href: string;
    className?: string;
    children?: React.ReactNode;
};

export default function Href({ href = "#", className = "", children }: HrefProps) {
    return (
        <a href={`${process.env.BASE_PATH || ""}/${href}`} className={`text-blue-400 hover:text-blue-500 underline ${className}`}>
            {children}
        </a>
    );
}