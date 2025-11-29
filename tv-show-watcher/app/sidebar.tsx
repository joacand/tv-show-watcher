"use client";

import SideBarLink from "./SideBarLink";
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import { useColorScheme } from '@mui/material/styles';
import SideBarButton from "./SideBarButton";
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function SideBar({ className = "", children }: { className?: string, children?: React.ReactNode }) {
    const { mode, setMode } = useColorScheme();

    const toggleTheme = async () => {
        if (mode === 'light') {
            setMode('dark');
        } else {
            setMode('light');
        }
    }

    return (
        <aside className={`
                flex flex-col items-start
                py-[20px] px-[30px]
                gap-[30px]
                w-[226px] h-full
                flex-grow-0
                ${className}
            `}>
            <SideBarLink href="/"><HomeIcon /> Home</SideBarLink>
            <SideBarLink href="/search"><AddBoxIcon /> Add TV Show</SideBarLink>
            <SideBarLink href="/about"><InfoIcon /> About</SideBarLink>
            <SideBarButton onClick={toggleTheme}><DarkModeIcon /> Mode</SideBarButton>
            {children}
        </aside>
    )
}