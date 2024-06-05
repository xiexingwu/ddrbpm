"use client";
import { useState } from "react";
import { IAppContext, AppContext } from "~/AppContext";
import NavBar from "~/components/NavBar";
import { Sort } from "~/types/Sort";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [isSp, setIsSp] = useState<boolean>(true);
    const [readSpeed, setReadSpeed] = useState<number>(600);
    const [sortBy, setSortBy] = useState<Sort>("Version");

    const context: IAppContext = {
        isSp, setIsSp,
        readSpeed, setReadSpeed,
        sortBy, setSortBy
    }
    return (
        <AppContext.Provider value={{...context}}>
            <body>
                <NavBar withContext={true} />
                <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                    {children}
                </main>
            </body>
        </AppContext.Provider>
    );
}
