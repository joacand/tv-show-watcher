"use client";

import Image from 'next/image';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const LOGO_SRC = `${BASE}/logo.svg`;

export default function Header({ className = "" }: { className?: string }) {

    return (
        <header className={`flex items-center px-10 gap-[100px] self-stretch flex-grow-0 ${className}`}>
            <Image loading="eager" src={LOGO_SRC} alt="Logo"
                height={0}
                width={0}
                style={{
                    width: '100px',
                    height: 'auto',
                    filter: 'drop-shadow(0 0 1px white)',
                }} />
            <h1 className="font-sans font-medium text-[52px] text-nowrap">TV Show Watcher</h1>
        </header>
    )
}