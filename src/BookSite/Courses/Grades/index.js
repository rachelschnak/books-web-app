import db from "../../Database";
import { useParams } from "react-router-dom";
import {CiExport, CiImport} from "react-icons/ci";
import {FaCog} from "react-icons/fa";
import {FiFilter} from "react-icons/fi";
import "./index.css"
function Grades() {
    const { courseId } = useParams();
    const assignments = db.assignments.filter((assignment) => assignment.course === courseId);
    const enrollments = db.enrollments.filter((enrollment) => enrollment.course === courseId);
    return (
        <div className="wd-grades-content">

        <div className="wd-kanbas-grade-buttons wd-kanbas-home-buttons-main">
            <a className="list-group-item wd-kanbas-home-button-main btn-light" role="button"><CiImport /> Import</a>
            <a className="list-group-item wd-kanbas-home-button-main btn-light" role="button"><CiExport />  Export</a>
            <a className="list-group-item wd-kanbas-home-button-main btn-light" role="button"> <FaCog /></a>
        </ div>

            <div className="row">
                <div className="col-6">
                    <label htmlFor="studentName" className="col-form-label"><h4>Student Names</h4>
                    </label>
                </div>
                <div className="col-6">
                    <label htmlFor="assignmentName" className="col-form-label"><h4>Assignment
                        Names</h4></label>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <input type="text" className="form-control" id="studentName"
                           value="Search Students" />
                </div>
                <div className="col-6">
                    <input type="text" className="form-control" id="assignmentName"
                           value="Search Assignments" />
                </div>
            </div>

            <div className="row-2 wd-kanbas-table">
                <a className="btn btn-light wd-grey-btn" role="button"><FiFilter /> Apply Filters</a>
            </div>


    <div className="wd-kanbas-home-main-list">

        <div>
            <div >
                <table className="table table-striped table-bordered table-hover wd-kanbas-table  text-center wd-table">
                    <thead>
                    <th>Student Name</th>
                    {assignments.map((assignment) => (<th>{assignment.title}</th>))}
                    </thead>
                    <tbody>
                    {enrollments.map((enrollment) => {
                        const user = db.users.find((user) => user._id === enrollment.user);
                        return (
                            <tr>
                                <td>{user.firstName} {user.lastName}</td>
                                {assignments.map((assignment) => {
                                    const grade = db.grades.find(
                                        (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                                    return (<td>{grade?.grade || ""}</td>);})}
                            </tr>);
                    })}
                    </tbody></table>
            </div></div>
    </div>
        </div>);
}
export default Grades;