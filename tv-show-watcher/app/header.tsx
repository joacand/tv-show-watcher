export default function Header({ className = "", children }: { className?: string, children?: React.ReactNode }) {
    return (
        <header className={`${className}`}>
            <h1>TV Show Watcher</h1>
        </header>
    )
}