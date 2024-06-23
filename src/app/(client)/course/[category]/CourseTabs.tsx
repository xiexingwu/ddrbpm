"use client";
import Link from "next/link";
import { courseCategories } from "./Courses";

export default function CourseTabs() {
    return (
        <nav className="flex flex-row justify-center space-x-6" >
            {courseCategories.map((category, _) => {
                let name;
                switch (category) {
                    case "life4":
                        name = "Life 4 Trials";
                        break;
                    case "nonstop":
                        name = "Nonstop Courses";
                        break;
                    case "dan":
                        name = "Dan Courses";
                        break;
                }
                return <Link href={`/course/${category}`} key={name}>{name}</Link>;
            })}
        </nav>
    );
}
