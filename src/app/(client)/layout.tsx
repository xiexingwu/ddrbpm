"use client";
import { useState } from "react";
import { type IAppContext, AppContext } from "~/AppContext";
import NavBar from "~/components/NavBar";
import { type SortBy } from "~/types/SortBy";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [isSp, setIsSp] = useState<boolean>(true);
    const [readSpeed, setReadSpeed] = useState<number>(600);
    const [sortBy, setSortBy] = useState<SortBy>("Version");

    const context: IAppContext = {
        isSp, setIsSp,
        readSpeed, setReadSpeed,
        sortBy, setSortBy
    }
    return (
        <AppContext.Provider value={{...context}}>
            <body className="text-white">
                <NavBar withContext={true} />
                <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                    {children}
                </main>
            </body>
        </AppContext.Provider>
    );
}
