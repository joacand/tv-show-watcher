import Image from 'next/image';

export default function Header({ className = "", children }: { className?: string, children?: React.ReactNode }) {
    return (
        <header className={`flex items-center px-[35px] gap-[100px] h-[147px] bg-white self-stretch flex-grow-0 ${className}`}>
            <Image loading="eager" src="/logo.svg" alt="Logo" 
                height={0}
                width={0}
                style={{width:'120px', height: "auto" }}/>
            <h1 className="font-sans font-medium text-[36px] leading-[46px] text-black">TV Show Watcher</h1>
        </header>
    )
}