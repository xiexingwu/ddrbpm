import Image from "next/image";
import { useContext } from "react";
import BpmSvg from "~/(svg)/BpmSvg";
import { AppContext } from "~/AppContext";
import { type Bpm } from "~/types/Bpm";
import { type Levels, diffs } from "~/types/Level";
import getAssetPath from "~/utils/assets";

export type SongSummaryProps = {
    name: string;
    title: string;
    version?: string;
    sp?: Levels;
    dp?: Levels;
    bpm_range: Bpm;

    readSpeed?: number;
};

export default function SongSummary(props: SongSummaryProps) {
    const context = useContext(AppContext);
    const song = props;
    const levels = song[context.spDp] ?? ({} as Levels);
    return (
        <div className="flex-column flex flex-wrap justify-center">
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
                {diffs.map((diff, _) => {
                    return (
                        <div key={diff} data-diff={diff}>
                            {
                                levels[diff] ?? "—" // emdash
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
