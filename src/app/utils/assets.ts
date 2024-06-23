import { env } from "process"
import { Dispatch, SetStateAction } from "react";
import { type CourseCategory, type CourseProps } from "~/(client)/course/[category]/Courses";
import { SpDp } from "~/types/Level";

type AssetType = 
    | "summary"
    | "course"
    | "jacket"
    | "song"

export default function getAssetPath(assetType: AssetType, title: string): string {
    let baseUrl;
    // env not resolving correctly from .env?
    switch (env.NODE_ENV){
        case "test":
        case "production":
            baseUrl= "https://raw.githubusercontent.com/xiexingwu/DDR-BPM-prep/main/build"
            // baseUrl= "https://cdn.jsdelivr.net/gh/xiexingwu/DDR-BPM-prep@main/build"
            break
        case "development":
        default:
            baseUrl= "/data"
    }

   switch (assetType) {
        case "summary":
            return `${baseUrl}/summaries/${title}.json`
        case "course":
            return `${baseUrl}/courses/${title}.json`
        case "jacket":
            return `${baseUrl}/jackets-160/${title}.png`
        case "song":
            return `${baseUrl}/songs/${title}.json`
    }
}

export function FetchCourseType(
    courseName: CourseCategory,
    setCourse: Dispatch<SetStateAction<CourseProps[] | null>>,
    spDp?: SpDp,
) {
    let fileName: string;
    switch (courseName) {
        case "life4":
            fileName = "life4";
            break;
        case "dan":
            fileName = `dan_${spDp}`;
            break;
        case "nonstop":
        default:
            fileName = "ddr";
    }

    fetch(getAssetPath("course", fileName))
        .then((response): Promise<CourseProps[]> => response.json())
        .then((data) => setCourse(data))
        .catch(() => console.log(`failed to fetch/parse`));
}
