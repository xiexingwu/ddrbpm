import "./NavBar.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "~/AppContext";
import { type SortBy, sortBys } from "~/types/SortBy";

type Props = {
    withContext: boolean;
};
export default function NavBar(props: Props) {
    const pathname = usePathname();

    return (
        <div className="fixed sticky top-0 z-50 flex h-12 flex-row bg-blue-700 pl-2">
            <div className="flex w-full flex-row items-center justify-between">
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

                    <Link
                        className={`link ${pathname === "/course" ? "active" : ""}`}
                        href="/course"
                    >
                        Courses
                    </Link>
                </div>

                {props.withContext && <Settings />}
            </div>
        </div>
    );
}

function Settings() {
    const pathname = usePathname();
    return (
        <div className="flex flex-row items-center space-x-2">
            {pathname.startsWith("/song") && <SortSelect />}
            <SpDpSelect />
        </div>
    );
}

function SpDpSelect() {
    /* {sp_pad|dp_pad}(SP|DP) */
    const context = useContext(AppContext);
    return (
        <div
            className="flex flex-row flex-nowrap items-center"
            onClick={() => context.setSpDp(context.spDp == "sp" ? "dp" : "sp")}
        >
            <p className="min-w-6">{context.spDp.toUpperCase()}</p>
            <div className="relative -mx-2">
                <Image
                    alt="dp"
                    className={`scale-[0.66] ${context.spDp == "sp" ? "grayscale" : ""}`}
                    width={90}
                    height={50}
                    src="/pad_dp.png"
                />
                <Image
                    alt="sp"
                    className={`absolute inset-0 scale-[0.66]`}
                    width={90}
                    height={50}
                    src="/pad_sp.png"
                />
            </div>
        </div>
    );
}

function SortSelect() {
    const context = useContext(AppContext);
    return (
        <div>
            <select
                className="bg-inherit"
                value={context.sortBy}
                onChange={(e) => context.setSortBy(e.target.value as SortBy)}
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
