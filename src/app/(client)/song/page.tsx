"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import getAssetPath from "~/utils/assets";
import { type Levels, diffs } from "~/types/Level";
import { type Bpm } from "~/types/Bpm";
import BpmSvg from "~/(svg)/BpmSvg";
import { AppContext } from "~/AppContext";

type SummarySong = {
    name: string;
    title: string;
    version: string;
    sp: Levels;
    dp: Levels;
    bpm_range: Bpm;
};

type Summary = {
    category: string | number;
    songs: SummarySong[];
}[];

type HeaderProps = {
    category: string;
    sticky: boolean;
    onClick: () => void;
};

export default function SongPage() {
    const context = useContext(AppContext);

    const [openCategory, setOpenCategory] = useState<string>("");

    // Load data
    const [summary, setSummary] = useState<Summary | null>(null);
    useEffect(() => {
        console.log(context);
        let summaryName: string;
        switch (context.sortBy) {
            case "Version":
                summaryName = "songs_version";
                break;
            case "Level":
                summaryName = `songs_level_${context.isSp ? "sp" : "dp"}`;
                break;
            case "Name":
            default:
                summaryName = "songs_name";
        }

        fetch(getAssetPath("summary", summaryName))
            .then((response): Promise<Summary> => response.json())
            .then((data) => setSummary(data))
            .catch(() => console.log(`failed to fetch/parse`));
    }, [context.sortBy, context.isSp]); // eslint-disable-line react-hooks/exhaustive-deps

    // components
    function SongCategoryHeader(props: HeaderProps) {
        let prefix: string;
        switch (context.sortBy) {
            case "Version":
                prefix = "DDR";
                break;
            case "Level":
                prefix = "LEVEL";
                break;
            case "Name":
                prefix = "NAME";
                break;
            default:
                prefix = "";
        }
        return (
            <div
                className={[
                    props.sticky ? "fixed sticky top-12 z-50" : "",
                    "bg-blue-500 w-full flex flex-row items-center",
                ].join(" ")}
                onClick={props.onClick}
            >
                <div
                    style={{ backgroundImage: "url('/category_header.png')" }}
                    className={[
                        "bg-cover bg-center",
                        "w-[360px] leading-8",
                        "text-center font-bold",
                    ].join(" ")}
                >
                    {prefix} {props.category}
                </div>
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
                        <Image
                            alt={song.name}
                            src={getAssetPath("jacket", song.name)}
                            width={160}
                            height={160}
                            className="scale-90"
                        />

                        <div className="flex min-h-8 w-full items-center justify-center ">
                            <p className="text-bold hline-clamp-2 over:line-clamp-none text-center text-xs">
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
                                            song[context.isSp ? "sp" : "dp"][
                                                diff
                                            ] ?? "—" // emdash
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
            {summary?.map(({ category, songs }, _) => {
                    category = category.toString();
                    return (
                        <>
                            {songs.length > 0 && (
                                <div
                                    key={category}
                                    className="flex-column flex flex-wrap justify-center"
                                >
                                    <SongCategoryHeader
                                        category={category}
                                        sticky={openCategory == category}
                                        onClick={() =>
                                            setOpenCategory(
                                                openCategory == category
                                                    ? ""
                                                    : category,
                                            )
                                        }
                                    />

                                    {openCategory == category && (
                                        <SongCategoryBody songs={songs} />
                                    )}
                                </div>
                            )}
                        </>
                    );
                })}
        </div>
    );
}
