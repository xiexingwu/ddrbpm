import "./NavBar.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "~/AppContext";
import { sortBys } from "~/types/SortBy";

type Props = {
    withContext: boolean;
};
export default function NavBar(props: Props) {
    const pathname = usePathname();

    return (
        <div className="fixed sticky top-0 z-50 flex h-12 flex-row bg-blue-700 pl-2">
            <div className="flex flex-row items-center justify-between w-full">
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

function Settings() {
    const context = useContext(AppContext);

    function SortBy() {
        return (
            <div>
                <select
                    className="bg-inherit"
                    value={context.sortBy}
                    onChange={(e) => context.setSortBy(e.target.value)}
                >
                    {sortBys.map((sortBy, _) => {
                        return (
                            <option value={sortBy} key={sortBy}>
                                {sortBy}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }

    function SpDp() {
        /* {sp_pad|dp_pad}(SP|DP) */
        return (
            <div
                className="flex flex-row flex-nowrap items-center"
                onClick={() => context.setIsSp(!context.isSp)}
            >
                <p className="">{context.isSp ? "SP" : "DP"}</p>
                <div className="relative -mx-2">
                    <img
                        className={`scale-[0.66] ${!context.isSp ? "" : "grayscale"}`}
                        src="/pad_dp.png"
                    />
                    <img
                        className={`absolute inset-0 scale-[0.66]`}
                        src="/pad_sp.png"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-row items-center space-x-2">
            <SortBy />
            <SpDp />
        </div>
    );
}
