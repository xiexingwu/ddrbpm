import Courses, { type CourseCategory } from "./Courses";

export async function generateStaticParams() {
    return [
        { category: "dan" },
        { category: "nonstop" },
        { category: "life4" },
    ];
}

export default function CoursePage({
    params,
}: {
    params: { category: CourseCategory };
}) {
    return <Courses category={params.category} />;
}
