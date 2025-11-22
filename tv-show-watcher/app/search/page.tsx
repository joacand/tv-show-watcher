"use client";

import SearchGrid from "./SearchGrid";

export default function Home() {
    return (
        <>
            <h1 className="h-[26px] font-sans font-medium text-[20px] leading-[26px] flex-none order-1 mb-3">Search for TV shows</h1>
            <SearchGrid />
        </>
    );
}
