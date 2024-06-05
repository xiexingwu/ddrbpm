import type React from "react";
import { createContext } from "react";
import { type SortBy } from "~/types/SortBy";

export interface IAppContext {
    isSp: boolean;
    sortBy: SortBy;
    readSpeed?: number;

    setIsSp: React.Dispatch<
        React.SetStateAction<boolean>
    >
    setSortBy: React.Dispatch<
        React.SetStateAction<SortBy>
    >
    setReadSpeed: React.Dispatch<
        React.SetStateAction<number>
    >
}

const defaultAppContext: IAppContext = {
    isSp: true,
    sortBy: "Version",
    readSpeed: 600,
    /* eslint-disable @typescript-eslint/no-empty-function */
    setIsSp: () => {},
    setSortBy: () => {},
    setReadSpeed: () => {}
    /* eslint-enable @typescript-eslint/no-empty-function */

};

export const AppContext = createContext<IAppContext>(defaultAppContext)
