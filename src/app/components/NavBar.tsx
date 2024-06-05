import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { AppContext, IAppContext } from "~/AppContext";

type Props = {
    withContext: boolean;
};
export default function NavBar(props: Props) {
    const pathname = usePathname();

    return (
        <div className="fixed sticky top-0 z-50 flex h-12 flex-row justify-center bg-blue-700">
            <div className="flex flex-row items-center justify-between px-4">
                <div className="space-x-4">
                    <Link
                        className={`link ${pathname === "/" ? "active" : ""}`}
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className={`link ${pathname === "/song" ? "active" : ""}`}
                        href="/song"
                    >
                        Songs
                    </Link>
                </div>

                {props.withContext && <Settings />}
            </div>
        </div>
    );
}

function SpDp() {
    /* {sp_pad|dp_pad}(SP|DP) */
    const context = useContext<IAppContext>(AppContext);
    return (
        <div>
            <div onClick={() => context.setIsSp(!context.isSp)}>
                <img
                    src="/pad_dp.png"
                    className={`absolute start-0 scale-75 justify-self-start ${!context.isSp ? "" : "grayscale"}`}
                />
                <img
                    src="/pad_sp.png"
                    className={`absolute start-0 scale-75 justify-self-start`}
                />
            </div>

            <div className={`${context.isSp ? "" : "grayscale"}`}>
                {context.isSp ? "SP" : "DP"}
            </div>
        </div>
    );
}

function SpDpSwap() {
    /* {sp_pad.png} SP <-> DP {dp_pad.png} */
    const context = useContext<IAppContext>(AppContext);
    return (
        <div>
            <div className="items-middle flex flex-row space-x-4 px-4">
                <div className="text-nowrap">
                    <p
                        className={`text-white ${context.isSp ? "" : "grayscale"}`}
                    >
                        <img src="/pad_sp.png" className={`inline scale-75`} />
                    </p>
                </div>

                <FaArrowRightArrowLeft
                    className="self-center"
                    onClick={() => context.setIsSp(!context.isSp)}
                />

                <div className="text-nowrap">
                    <p
                        className={`text-white ${!context.isSp ? "" : "grayscale"}`}
                    >
                        <img src="/pad_dp.png" className={`inline scale-75`} />
                    </p>
                </div>
            </div>
        </div>
    );
}

function Settings() {
    return (
        <div className="flex flex-row space-x-4">
            <SpDp />
        </div>
    );
}
