import type React from "react";
import { createContext } from "react";
import { type SortBy } from "~/types/SortBy";
import { SpDp } from "./types/Level";

export interface IAppContext {
    spDp: SpDp;
    sortBy: SortBy;
    readSpeed?: number;

    setSpDp: React.Dispatch<
        React.SetStateAction<SpDp>
    >
    setSortBy: React.Dispatch<
        React.SetStateAction<SortBy>
    >
    setReadSpeed: React.Dispatch<
        React.SetStateAction<number>
    >
}

const defaultAppContext: IAppContext = {
    spDp: "sp",
    sortBy: "Version",
    readSpeed: 600,
    /* eslint-disable @typescript-eslint/no-empty-function */
    setSpDp: () => {},
    setSortBy: () => {},
    setReadSpeed: () => {}
    /* eslint-enable @typescript-eslint/no-empty-function */

};

export const AppContext = createContext<IAppContext>(defaultAppContext)
