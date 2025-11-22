import SideBarLink from "./SideBarLink";

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
            <SideBarLink href="/">Home</SideBarLink>
            <SideBarLink href="/search">Add TV Show</SideBarLink>
            <SideBarLink href="/about">About</SideBarLink>
            {children}
        </aside>
    )
}