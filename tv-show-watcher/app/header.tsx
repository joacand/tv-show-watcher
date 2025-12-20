"use client";

import Image from 'next/image';

export default function Header({ className = "", children }: { className?: string, children?: React.ReactNode }) {
    const basePath = process.env.BASE_PATH ?? "";

    return (
        <header className={`flex items-center px-[35px] gap-[100px] h-[147px] self-stretch flex-grow-0 ${className}`}>
            <Image loading="eager" src={`${basePath}/logo.svg`} alt="Logo"
                height={0}
                width={0}
                style={{
                    width: '120px',
                    height: 'auto',
                    filter: 'drop-shadow(0 0 1px white) drop-shadow(0 0 1px white)',
                }} />
            <h1 className="font-sans font-medium text-[52px] leading-[46px]">TV Show Watcher</h1>
        </header>
    )
}