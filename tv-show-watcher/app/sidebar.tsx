import Link from "next/link";

export default function SideBar({ className = "", children }: { className?: string, children?: React.ReactNode }) {
    return (
        <div className={`${className}`}>
            <section className="flex flex-col gap-4">
                <Link href="/">
                    Go to Home
                </Link>
                <Link href="/search">
                    Go to Search
                </Link>
            </section>
        </div>
    )
}