import { useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

type SpeedMod = number;
// | 0.25
// | 0.5
// | 0.75
// | 1.0
// | 1.25
// | 1.5
// | 1.75
// | 2.0
// | 2.25
// | 2.5
// | 2.75
// | 3.0
// | 3.25
// | 3.5
// | 3.75
// | 4.0
// | 4.5
// | 5.0
// | 5.5
// | 6.0
// | 6.5
// | 7.0
// | 7.5
// | 8.0;

type Props = {
    speedMod?: SpeedMod;
    bpms: [number] | [number, number];
    readSpeed?: number;
};

function fmtSpeedMod(speedMod: SpeedMod): string {
    let str = speedMod.toFixed(2);

    if (str.slice(-1) == "0") str = str.slice(0, -1);
    if (str.slice(-1) == "0") str = str.slice(0, -1);
    if (str.slice(-1) == ".") str = str.slice(0, -1);

    return str;
}

function guessSpeedMod(bpm: number, readSpeed: number) {
    let guess = Math.floor(readSpeed / bpm);
    while (guess <= 7.5) {
        let nextGuess = guess + (guess < 4.0 ? 0.25 : 0.5);
        if (readSpeed - nextGuess * bpm < 0) {
            break;
        }
        guess = nextGuess;
    }
    return guess;
}

function Header(props: Props) {
    return (
        <div className="flex flex-row flex-nowrap">
            {props.bpms.length == 1 ? (
                <>
                    <span className="basis-1/2">Speed Mod</span>
                    <span className="basis-1/2 text-center">Speed</span>
                </>
            ) : (
                <>
                    <span className="basis-1/3">Speed Mod</span>
                    <span className="basis-1/3 text-center">Min</span>
                    <span className="basis-1/3 text-center">Max</span>
                </>
            )}
        </div>
    );
}

function Body(props: Props) {
    return (
        <div className="flex flex-row flex-nowrap">
            {props.bpms.length == 1 ? (
                <>
                    <span className="basis-1/2">
                        {fmtSpeedMod(props.speedMod!)}
                    </span>
                    <span className="basis-1/2 text-center">
                        {(props.speedMod! * props.bpms[0]).toFixed(0)}
                    </span>
                </>
            ) : (
                <>
                    <span className="basis-1/3">
                        {fmtSpeedMod(props.speedMod!)}
                    </span>
                    <span className="basis-1/3 text-center">
                        {(props.speedMod! * props.bpms[0]).toFixed(0)}
                    </span>
                    <span className="basis-1/3 text-center">
                        {(props.speedMod! * props.bpms[1]).toFixed(0)}
                    </span>
                </>
            )}
        </div>
    );
}

export default function BpmPicker(props: Props) {
    const [speedMod, setSpeedMod] = useState<SpeedMod>(
        guessSpeedMod(props.bpms.slice(-1).pop()!, props.readSpeed ?? 500),
    );

    let mods = [speedMod];
    if (speedMod > 0.25) {
        mods.push(speedMod - (speedMod > 4.0 ? 0.5 : 0.25));
    }
    if (speedMod < 8.0) {
        mods.splice(0, 0, speedMod + (speedMod < 4.0 ? 0.25 : 0.5));
    }

    function onClickSpeed(decrease: boolean) {
        // Do not go below 0.5 to keep 0.25 showing
        // Likewise for 7.5 and 8.0
        if (decrease && speedMod > 0.5) {
            setSpeedMod(speedMod - (speedMod > 4.0 ? 0.5 : 0.25));
        } else if (!decrease && speedMod < 7.5) {
            setSpeedMod(speedMod + (speedMod < 4.0 ? 0.25 : 0.5));
        }
    }

    return (
        <div className="flex w-72 flex-row flex-nowrap">
            <div className="flex flex-initial grow flex-col flex-nowrap">
                <Header {...props} />
                <>
                    {mods.map((speedMod, i) => {
                        return <Body speedMod={speedMod} {...props} key={i} />;
                    })}
                </>
            </div>

            <div className="flex flex-initial flex-col flex-nowrap justify-around">
                <FaCirclePlus
                    className="scale-150"
                    onClick={() => onClickSpeed(false)}
                />
                <FaCircleMinus
                    className="scale-150"
                    onClick={() => onClickSpeed(true)}
                />
            </div>
        </div>
    );
}
