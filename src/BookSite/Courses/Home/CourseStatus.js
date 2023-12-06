import {FaFileImport} from "react-icons/fa";
import {MdLabelImportantOutline} from "react-icons/md";
import {BiTargetLock} from "react-icons/bi";
import {ImStatsBars} from "react-icons/im";
import {TfiAnnouncement} from "react-icons/tfi";
import {AiOutlineBell} from "react-icons/ai";
import {Link, useParams} from "react-router-dom";
import db from "../../Database";

function CourseStatus() {
    const assignments = db.assignments;
    const { courseId } = useParams();
    const course = db.courses.find((course) => course._id === courseId);
    return (
        <div className="col-2 d-none d-md-block wd-course-top-nav-bar-large">
        <div className="list-group wd-kanbas-home-buttons-status justify-content-center">
            <a className="list-group-item wd-kanbas-home-button btn-light" role="button"> <FaFileImport /> Import Existing Content</a>
            <a className="list-group-item wd-kanbas-home-button wd-published-button btn-light" role="button"><MdLabelImportantOutline />  Import From Commons</a>
            <a className="list-group-item wd-kanbas-home-button btn-light" role="button"> <BiTargetLock /> Choose Home Page</a>
            <a className="list-group-item wd-kanbas-home-button btn-light" role="button"> <ImStatsBars /> View Course Stream</a>
            <a className="list-group-item wd-kanbas-home-button btn-light" role="button"> <TfiAnnouncement /> New Announcement</a>
            <a className="list-group-item wd-kanbas-home-button btn-light" role="button"> <ImStatsBars /> New Analytics</a>
            <a className="list-group-item wd-kanbas-home-button btn-light" role="button"> <AiOutlineBell /> View Course Notifications</a>
            <br />
        </div>
    <h4>To Do</h4>
    <hr />
    <div className="wd-kanbas-home-todo-list list-group">
       <ul className="list-group wd-kanbas-home-todo-list">
            {assignments.filter((assignment) => assignment.course === courseId).map((assignment, index) => (

                    <Link key={assignment.title} to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} className="list-group-item wd-kanbas-home-todo-list-item">
                        Grade {assignment._id} {assignment.title} <br/>
                        <div className="wd-todo-sub">100 points - Oct 31 at 11:59pm </div>
                    </Link>

                    ))
            }
        </ul>





    </div>
        </div>
    )
}
export default CourseStatus