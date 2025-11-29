import SideBarLink from "./SideBarLink";
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';

export default function SideBar({ className = "", children }: { className?: string, children?: React.ReactNode }) {
    return (
        <aside className={`
                flex flex-col items-start
                py-[20px] px-[30px]
                gap-[30px]
                w-[226px] h-full
                flex-grow-0
                ${className}
            `}>
            <SideBarLink href="/"><HomeIcon/> Home</SideBarLink>
            <SideBarLink href="/search"><AddBoxIcon/> Add TV Show</SideBarLink>
            <SideBarLink href="/about"><InfoIcon/> About</SideBarLink>
            {children}
        </aside>
    )
}