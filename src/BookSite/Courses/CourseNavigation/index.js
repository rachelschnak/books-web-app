import "./index.css";
import {Link, useLocation, useParams} from "react-router-dom";
import db from "../../Database";

function CourseNavigation() {
    {
        const links = ["Home", "Modules", "Piazza", "Zoom Meetings", "Assignments", "Quizzes", "Grades","People","Panopto Video", "Discussions", "Announcements", "Pages", "Files", "Rubrics","Outcomes","Collaborations","Syllabus","Settings"];
        const { courseId } = useParams();
        const { pathname } = useLocation();

        return (
            <div className="list-group wd-course-navigation d-none d-md-block wd-course-top-nav-bar-large wd-main-nav-bar">
                <h6>{courseId}_1 Fall 2023 Semester</h6>
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={`/Kanbas/Courses/${courseId}/${link}`}
                        className={`list-group-item ${pathname.includes(link) && "active"}`}>
                        {link}
                    </Link>
                ))}
            </div>
        );
    }
}

export default CourseNavigation;

