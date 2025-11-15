export default function SideBar({ className = "", children }: { className?: string, children?: React.ReactNode }) {
    return (
        <div className={`${className}`}>
            <section>
                Add new TV Show
            </section>
        </div>
    )
}