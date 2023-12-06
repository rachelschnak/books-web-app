import {React, useState} from "react";
import { Link } from "react-router-dom";
//import db from "../Database";
import "./index.css";
function Home({courses, course, setCourse, addNewCourse,
                        deleteCourse, updateCourse, resetCourse }) {

    return (
        <div className="wd-project-home-dashboard">
            <h1>Dashboard</h1>
            <hr/>
            <h2>Published Courses ({courses.length})</h2>
            <hr/>
            <h5>Course</h5>
            <div className="wd-module-list">
                <div className="wd-edit-modules row">

            <input value={course.name} className="form-control"
                   onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
            <input value={course.number} className="form-control"
                   onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
            <input value={course.startDate} className="form-control" type="date"
                   onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>
            <input value={course.endDate} className="form-control" type="date"
                   onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />

            <div className="wd-module-edit-buttons">
                <button className="btn btn-primary float-end" onClick={() => {updateCourse(); resetCourse()}} >
                    Update
                </button>
                        <button className="btn btn-success float-end" onClick={() => {addNewCourse(); resetCourse()}} >Add</button>
            </div>
                    </div>
            <div className="card-deck wd-kanbas-dashboard-grid">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4" >
                    {courses.map((course) => (
                    <Link key={course._id}
                          to={`/BookSite/Courses/${course._id}`}
                          className="list-group-item" className="card">
                        {<img src="https://informationage-production.s3.amazonaws.com/uploads/2022/10/forget-digital-transformation-data-transformation-is-what-you-need.jpg" className="card-img-top" />}
                        {course.name}

                    <p className="card-title">{course.number} {course.name} </p>
                        <p className="card-text">{course.number}.{course._id}.{course.startDate}</p>
                        <p className="card-text wd-kanbas-dashboard-card-subtext">{course.startDate} Fall 2023 Semester Full Term</p>



                        <div className="wd-dashboard-button d-inline-block float-end">
                        <button className="btn btn-warning"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setCourse(course);
                                }}>
                            Edit
                        </button>

                        <button className="btn btn-danger"
                            onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                            }}>
                            Delete
                        </button>

                        </div>


                    </Link> ))}
                </div>
            </div>
            </div>
        </div>
    ); }
export default Home;