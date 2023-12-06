import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import "./index.css"
import {AiOutlineCheckCircle, AiOutlinePlus} from "react-icons/ai";
import {BiDotsVerticalRounded} from "react-icons/bi";
import {useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import {
    selectAssignment,
    deleteAssignment, setAssignments
} from "./assignmentsReducer";

import {findAssignmentsForCourse} from "./service";
import * as service from "./service";


function Assignments() {
    const { courseId } = useParams();

    useEffect(() => {
        findAssignmentsForCourse(courseId)
            .then((assignments) =>
                      dispatch(setAssignments(assignments))
            );
    }, [courseId]);

    const handleDeleteAssignment = (assignmentId) => {
        service.deleteAssignment(assignmentId).then((status) => {
            dispatch(deleteAssignment(assignmentId));
        });
    };

    const assignment = useSelector((state) => state.assignmentsReducer.assignment);
    const courseAssignments = useSelector((state) => state.assignmentsReducer.assignments.filter((assignment) => assignment.course === courseId));
    const dispatch = useDispatch();

    function confirmDelete(assignment) {
        if (window.confirm('Confirm deletion of assignment')) {
            return handleDeleteAssignment(assignment._id)//dispatch(deleteAssignment(assignment._id));
        }
    }

    return (
        <div className="wd-assignment-content">
            <div className="wd-kanbas-assignment-buttons-main ">
                <a className="list-group-item wd-kanbas-assignment-button-main btn-light float-none" role="button"> Group</a>
                <Link to={`/Kanbas/Courses/${courseId}/Assignments/NewAssignment`}>
                    <a className="list-group-item wd-kanbas-assignment-button-main wd-red-button float-none" role="button" onClick={() => dispatch(selectAssignment(assignment))}>
                        <AiOutlinePlus />  Assignment</a></Link>
                <a className="list-group-item wd-kanbas-assignment-button-main btn-light float-none" role="button"> <BiDotsVerticalRounded /></a>
            </ div>
            <hr/>


            <div className="list-group wd-assignment-list">

                <div className="list-group-item wd-assignment-header">ASSIGNMENTS</div>
                {courseAssignments.map((assignment) => (

                    <Link className="list-group-item wd-assignment-list-item d-inline-block"
                        key={assignment._id}
                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                         onClick={(e) => dispatch(selectAssignment(assignment))}>
                        {assignment.title}
                        <button className="btn btn-danger me-2 float-end" onClick={(event) => {confirmDelete(assignment); event.preventDefault();}}>Delete</button>

                    </Link>


                ))}

            </div>

            <div className="list-group wd-assignment-list">
                <div className="list-group-item wd-assignment-header">QUIZZES</div>
            </div>
        </div>
    );
}
export default Assignments;