"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import getAssetPath from "../utils/assets";
import { Levels, diffs } from "../types/Level";
import { Bpm } from "../types/Bpm";
import BpmSvg from "../(svg)/BpmSvg";

type Sort = "Level" | "Name" | "Version";

type SummarySong = {
    name: string;
    title: string;
    version: string;
    sp: Levels;
    dp: Levels;
    bpm_range: Bpm;
};

type SummaryCategory = string; // 1-19, A-Z0-9 kanas, A3/A20P/etc.

type Summary = Record<SummaryCategory, SummarySong[]>;

type SongCategoryProps = {
    category: string;
    onClick: () => void;
};

export default function SongPage() {
    const [sortBy, setSortBy] = useState<Sort>("Version");
    const [isSp, setIsSp] = useState<boolean>(true);

    const [openIndex, setOpenIndex] = useState<number>(-1);

    // Load data
    const [summary, setSummary] = useState<Summary | null>(null);
    useEffect(() => {
        fetch(getAssetPath("summary", "songs_level_sp"))
            .then((response): Promise<Summary> => response.json())
            .then((data) => setSummary(data))
            .catch(() => console.log(`failed to fetch/parse`));
    }, [sortBy, isSp]);

    // components
    function SongCategoryHeader(props: SongCategoryProps) {
        return (
            <div
                className="w-full text-center font-bold"
                onClick={props.onClick}
            >
                Level {props.category}
            </div>
        );
    }

    function SongCategoryBody(props: { songs: SummarySong[] }) {
        return (
            <div className="container grid max-w-2xl grid-cols-3 gap-4">
                {props.songs.map((song, i) => (
                    <div
                        className="flex-column flex flex-wrap justify-center"
                        key={i}
                    >
                        <img
                            src={getAssetPath("jacket", song.name)}
                            className="scale-90"
                        />

                        <div className="flex min-h-8 w-full items-center justify-center ">
                            <p className="text-bold text-xs text-center hline-clamp-2 over:line-clamp-none">
                                {song.title}
                            </p>
                        </div>

                        <div className="flex w-11/12 flex-row justify-end">
                            <div className="flex-grow pr-2 text-right text-xs">
                                {song.bpm_range.join("~")}
                            </div>
                            <svg className="size-4" color="white">
                                <BpmSvg />
                            </svg>
                        </div>

                        <div className="grid w-full grid-cols-5 justify-items-center">
                            {diffs.map((diff, i) => {
                                return (
                                    <div key={i} data-diff={diff}>
                                        {
                                            song.sp[diff] ?? "—" // emdash
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="container">
            <>
                {summary &&
                    Object.entries(summary).map(([category, songs], i) => {
                        return (
                            <div className="flex-column flex flex-wrap justify-center">
                                <SongCategoryHeader
                                    category={category}
                                    key={i}
                                    onClick={() =>
                                        setOpenIndex(openIndex == i ? -1 : i)
                                    }
                                />

                                {openIndex == i && (
                                    <SongCategoryBody songs={songs} />
                                )}
                            </div>
                        );
                    })}
            </>
        </div>
    );
}
