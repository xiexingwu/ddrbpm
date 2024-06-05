import React, { createContext } from "react";
import { Sort } from "~/types/Sort";

// export type AppContextType = {
//     isSp: boolean;
//     sortBy: "Version" | "Name" | "Level";
//     readSpeed?: number;
// };
export interface IAppContext {
    // context: AppContextType;
    isSp: boolean;
    sortBy: Sort;
    readSpeed?: number;

    setIsSp: React.Dispatch<
        React.SetStateAction<boolean>
    >
    setSortBy: React.Dispatch<
        React.SetStateAction<Sort>
    >
    setReadSpeed: React.Dispatch<
        React.SetStateAction<number>
    >
}

const defaultAppContext: IAppContext = {
    isSp: true,
    sortBy: "Version",
    readSpeed: 600,
    setIsSp: () => {},
    setSortBy: () => {},
    setReadSpeed: () => {}
};

export const AppContext = createContext<IAppContext>(defaultAppContext)
