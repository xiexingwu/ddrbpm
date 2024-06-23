import { type CourseCategory } from "./Courses";
import CourseTabs from "./CourseTabs";


// export async function generateStaticParams(): Promise<
//     { category: CourseCategory }[]
// > {
//     return [
//         { category: "dan" },
//         { category: "nonstop" },
//         { category: "life4" },
//     ];
// }

export default function CourseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <CourseTabs/>
            <div>{children}</div>
        </>
    );
}
