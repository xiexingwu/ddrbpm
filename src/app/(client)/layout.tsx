"use client";
import { useState } from "react";
import { type IAppContext, AppContext } from "~/AppContext";
import NavBar from "~/NavBar";
import { type SortBy } from "~/types/SortBy";
import { type SpDp } from "~/types/Level";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [spDp, setSpDp] = useState<SpDp>("sp");
    const [readSpeed, setReadSpeed] = useState<number>(600);
    const [sortBy, setSortBy] = useState<SortBy>("Version");

    const context: IAppContext = {
        spDp,
        setSpDp,
        readSpeed,
        setReadSpeed,
        sortBy,
        setSortBy,
    };
    return (
        <AppContext.Provider value={{ ...context }}>
            <body className="text-white">
                <NavBar withContext={true} />
                <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                    <div className="container">{children}</div>
                </main>
            </body>
        </AppContext.Provider>
    );
}
