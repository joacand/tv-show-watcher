"use client";

import Image from 'next/image';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const LOGO_SRC = `${BASE}/logo.svg`;

export default function Header({ className = "", children }: { className?: string, children?: React.ReactNode }) {

    return (
        <header className={`flex items-center px-[35px] gap-[100px] h-[147px] self-stretch flex-grow-0 ${className}`}>
            <Image loading="eager" src={LOGO_SRC} alt="Logo"
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