import SongSummary from "~/(client)/song/SongSummary";

import { type CourseProps } from "~/(client)/course/[category]/Courses";

export default function CourseSummary(props: { course: CourseProps }) {
    return (
        <>
            <div className="container grid max-w-2xl grid-cols-4 gap-4">
                {props.course.songs.map((song, _) => {
                    return (
                        <div key={song.name}>
                            <SongSummary {...song} key={song.name} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
