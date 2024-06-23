import { useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import {
    fmtSpeedMod,
    guessSpeedMod,
    type Bpm,
    type ReadSpeed,
    type SpeedMod,
} from "~/types/Bpm";

type BpmPickerProps = {
    speedMod?: SpeedMod;
    bpms: Bpm;
    readSpeed?: ReadSpeed;
};

function Header(props: BpmPickerProps) {
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

function Body(props: BpmPickerProps) {
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

export default function BpmPicker(props: BpmPickerProps) {
    const [speedMod, setSpeedMod] = useState<SpeedMod>(
        guessSpeedMod(props.bpms.slice(-1).pop()!, props.readSpeed ?? 500),
    );

    const mods = [speedMod];
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
                        return (
                            <Body
                                speedMod={speedMod}
                                {...props}
                                key={speedMod}
                            />
                        );
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
