"use client";

import Header from "./header";
import SideBar from "./sidebar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header className="h-16 bg-blue-600 text-white flex items-center px-4" />
      <div className="flex flex-1">
        <SideBar className="" />
        <main className="flex-1 p-6 bg-red-50">
          Here is the grid.
        </main>
      </div>
    </div>
  );
}
