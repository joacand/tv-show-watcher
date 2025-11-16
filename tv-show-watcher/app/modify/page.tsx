"use client";

import ModifyGrid from "./modifyGrid";
import SearchGrid from "./searchGrid";

export default function Home() {
    return (
        <>
            <h1 className="h-[26px] font-sans font-medium text-[20px] leading-[26px] text-black flex-none order-1">Search for new TV shows</h1>
            <SearchGrid />
            <h1 className="h-[26px] font-sans font-medium text-[20px] leading-[26px] text-black flex-none order-1">Existing TV shows</h1>
            <ModifyGrid />
        </>
    );
}
