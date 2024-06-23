"use client";
import { useContext, useEffect, useState } from "react";
import getAssetPath from "~/utils/assets";
import { AppContext } from "~/AppContext";
import SongSummary, { SongSummaryProps } from "./SongSummary";

type Summary = {
    category: string | number;
    songs: SongSummaryProps[];
}[];

type SongCategoryHeaderProps = {
    category: string;
    sticky: boolean;
    onClick: () => void;
};

function SongCategoryHeader(props: SongCategoryHeaderProps) {
    const context = useContext(AppContext);
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
            className={props.sticky ? "fixed sticky top-12 z-50" : ""}
            onClick={props.onClick}
        >
            <div
                className={[
                    "grid grid-rows-1 justify-center",
                    "w-full bg-inherit",
                ].join(" ")}
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
        </div>
    );
}

function SongCategoryBody(props: { songs: SongSummaryProps[] }) {
    return (
        <div className="container grid max-w-2xl grid-cols-3 gap-4">
            {props.songs.map((song, _) => (
                <SongSummary
                    {...song}
                    key={song.name}
                />
            ))}
        </div>
    );
}

export default function SongPage() {
    const context = useContext(AppContext);

    const [openCategory, setOpenCategory] = useState<string>("");

    // Load data
    const [summary, setSummary] = useState<Summary | null>(null);
    useEffect(() => {
        let summaryName: string;
        switch (context.sortBy) {
            case "Version":
                summaryName = "songs_version";
                break;
            case "Level":
                summaryName = `songs_level_${context.spDp}`;
                break;
            case "Name":
            default:
                summaryName = "songs_name";
        }

        fetch(getAssetPath("summary", summaryName))
            .then((response): Promise<Summary> => response.json())
            .then((data) => setSummary(data))
            .catch(() => console.log(`failed to fetch/parse`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.sortBy, context.spDp]);

    return (
        <>
            {summary?.map(({ category, songs }, _) => {
                category = category.toString();
                if (songs.length > 0) {
                    return (
                        <div
                            key={category}
                            className="flex flex-col items-center"
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
                    );
                }
            })}
        </>
    );
}
