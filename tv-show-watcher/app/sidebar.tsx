import SidebarLink from "./sidebarLink";

export default function SideBar({ className = "", children }: { className?: string, children?: React.ReactNode }) {
    return (
        <aside className={`
                flex flex-col items-start
                py-[20px] px-[30px]
                gap-[30px]
                w-[226px] h-full
                bg-white
                flex-grow-0
                ${className}
            `}>
            <SidebarLink href="/">Home</SidebarLink>
            <SidebarLink href="/modify">Modify TV Shows</SidebarLink>
            <SidebarLink href="/about">About</SidebarLink>
            {children}
        </aside>
    )
}