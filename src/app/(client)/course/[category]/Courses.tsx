"use client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "~/AppContext";
import { Bpm } from "~/types/Bpm";
import { Levels, SpDp } from "~/types/Level";
import { FetchCourseType as FetchCourseCategory } from "~/utils/assets";
import CourseSummary from "./CourseSummary";


export const courseCategories = ["dan", "nonstop", "life4"] as const;
export type CourseCategory = (typeof courseCategories)[number];

export type CourseProps = {
    name: string;
    spDp?: SpDp;
    level?: number;
    songs: CourseSongProps[];
};
type CourseSongProps = {
    name: string;
    title: string;
    sp?: Levels;
    dp?: Levels;
    bpm_range: Bpm;
};

type CourseHeaderProps = {
    name: string;
    sticky: boolean;
    onClick: () => void;
};

function CourseHeader(props: CourseHeaderProps) {
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
                    {props.name}
                </div>
            </div>
        </div>
    );
}

export default function Courses(props: {
    category: CourseCategory
}) {
    const context = useContext(AppContext);

    const [openCourse, setOpenCourse] = useState<string>("");

    // Load data
    const [courses, setCourses] = useState<CourseProps[] | null>(null);
    useEffect(() => {
        FetchCourseCategory(props.category, setCourses, context.spDp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.spDp]);

    return courses?.map((course, _) => {
        return (
            <div key={course.name} className="flex flex-col items-center">
                <CourseHeader
                    name={course.name}
                    sticky={openCourse == course.name}
                    onClick={() =>
                        setOpenCourse(
                            openCourse == course.name ? "" : course.name,
                        )
                    }
                />

                {openCourse == course.name && <CourseSummary course={course} />}
            </div>
        );
    });
}
