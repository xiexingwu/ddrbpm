"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import getAssetPath from "../utils/assets";
import { Level } from "../types/Level";
import { Bpm } from "../types/Bpm";

type Sort = "Level" | "Name" | "Version";

type SummaryItem = {
    name: string;
    title: string;
    version: string;
    sp: Level;
    dp: Level;
    bpm_range: Bpm;
};

type Summary = Record<string, SummaryItem[]>;


export default function SongPage() {
    const [sortBy, setSortBy] = useState<Sort>("Version");
    const [isSp, setIsSp] = useState<boolean>(true);

    const [summary, setSummary] = useState<Summary | null>(null);
    useEffect(() => {
        fetch(getAssetPath("summary", "songs_level_sp"))
            .then((response): Promise<Summary> => response.json())
            .then((data) => setSummary(data))
            .catch(() => console.log(`failed to fetch/parse`));
    }, [sortBy, isSp]);

    return (
        <div className="grid">
            <>
                {summary &&
                    Object.entries(summary).map(([category, songs], i) => {
                        return (
                            <div key={i}>
                                {category}:
                                <>
                                    {songs.map((song, i) => {
                                        return (
                                            <div key={i}>
                                                {song.name}|{song.title}|
                                                {song.version}|
                                                {song.sp.b ?? "-"},
                                                {song.sp.B ?? "-"},
                                                {song.sp.D ?? "-"},
                                                {song.sp.E ?? "-"},
                                                {song.sp.C ?? "-"}|
                                                {song.bpm_range}
                                            </div>
                                        );
                                    })}
                                </>
                            </div>
                        );
                    })}
            </>
        </div>
    );
}
