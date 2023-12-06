import {Link, useLocation, useParams} from "react-router-dom";
//import db from "../Database";
import {FaBars} from "react-icons/fa";
import {LuGlasses} from "react-icons/lu";
import "./index.css"
import {useEffect, useState} from "react";
import axios from "axios";

function CourseTopNavBar(){
    const API_BASE = process.env.REACT_APP_API_BASE;
    const URL = `${API_BASE}/courses`;
    const { courseId } = useParams();
    const [course, setCourse] = useState({});
    const findCourseById = async (courseId) => {
        const response = await axios.get(
            `${URL}/${courseId}`
        );
        setCourse(response.data);
    };
    useEffect(() => {
        findCourseById(courseId);
    }, [courseId]);
    //const course = courses.find((course) => course._id === courseId);
    const pathname = useLocation();
    const pageName = pathname.pathname.split('/').pop();
    return(
        <div className="wd-course-top-nav-bar">
            <div className="d-block d-md-none">
                <nav className="navbar bg-dark fixed-top wd-sm-nav-menu">
                    <div className="container-fluid">

                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"><i
                                className="fa-solid fa-bars"></i></span>
                        </button>
                    </div>
                </nav>
            </div>
        <div className="d-none d-md-block wd-course-top-nav-bar-large wd-main-nav-bar">
            <nav className="navbar" aria-label="breadcrumb">
                            <ul className="breadcrumb" id="brd">
                                <a className="wd-big-nav-icon wd-padding-right wd-red"><FaBars /> </a>
                                <li className="breadcrumb-item wd-kanbas-home-main-nav-pagebacklink wd-red"><Link key={course._id} to={`/Kanbas/Courses/${course._id}` }>{course.number}.{course._id}.{course.startDate}</Link></li>

                                <li className="breadcrumb-item active wd-kanbas-home-main-nav"
                                    aria-current="page">
                                    {pageName}
                                </li>
                            </ul>

                     <a className="wd-kanbas-studentViewButton btn-light float-end" role="button"><LuGlasses /> Student View</a>
            </nav>

        </div>

        </div>
    )
}
export default CourseTopNavBar