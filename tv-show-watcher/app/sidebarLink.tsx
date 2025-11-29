import Link from "next/link";

export default function SideBarLink({ href, children }: { href: string, children?: React.ReactNode }) {
    return (
        <h2 className="font-sans font-medium text-[20px] leading-[26px]">
            <Link className="gap-2 flex items-center" href={href}>{children}</Link>
        </h2>
    );
} 