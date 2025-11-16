import Link from "next/link";

export default function SidebarLink({ href, children }: { href: string, children?: React.ReactNode }) {
    return (
        <h2 className="w-[164px] h-[26px] font-sans font-medium text-[20px] leading-[26px] text-black flex-none order-1">
            <Link href={href}>{children}</Link>
        </h2>
    );
} 