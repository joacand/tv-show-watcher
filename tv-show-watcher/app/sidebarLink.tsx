import Link from "next/link";

export default function SideBarLink({ href, children }: { href: string, children?: React.ReactNode }) {
    return (
        <h2 className="w-[164px] h-[26px] font-sans font-medium text-[20px] leading-[26px] text-slate-50 flex-none order-1">
            <Link href={href}>{children}</Link>
        </h2>
    );
} 