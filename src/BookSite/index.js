import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Courses from "./Courses";
import axios from "axios";
import {useEffect, useState} from "react";
import store from "./store";
import { Provider } from "react-redux";
import Signin from "./users/signin";
import UserTable from "./users/table";
import Account from "./users/account.js"
import UserList from "./users/list";
import UserDetails from "./users/details";
import Signup from "./users/signup";
import Search from "./search";
import BookNavigation from "./BookNavigation";
import Home from "./Home";
import Details from "./details";


function BookSite() {
    const [courses, setCourses] = useState([]);
    //const URL = "http://localhost:4000/api/courses";
    const API_BASE = process.env.REACT_APP_API_BASE;
    const URL = `${API_BASE}/courses`;

    const findAllCourses = async () => {
        const response = await axios.get(URL);
        setCourses(response.data);
    };
    useEffect(() => {
        findAllCourses();
    }, []);

    const [course, setCourse] = useState({
                                             name: "New Course", number: "New Number",
                                             startDate: "2023-09-10", endDate: "2023-12-15",
                                         });

    const updateCourse = async () => {
        const response = await axios.put(
            `${URL}/${course._id}`,
            course
        );
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return response.data;
                } else {
                    return c;
                }}))
        setCourse({ name: ""});
    };

    const addNewCourse = async () => {
        const response = await axios.post(URL, course);
        setCourses([response.data, ...courses]);
        setCourse({ name:"" })
    };
    const deleteCourse = async (course_id) => {
        const response = await axios.delete(
            `${URL}/${course_id}`
        );
        setCourses(courses.filter((c) => c._id !== course_id));
    };

    const resetCourse = () => setCourse({
                                            name: "New Course", number: "New Number",
                                            startDate: "2023-09-10", endDate: "2023-12-15",
                                        });

    return (
        <Provider store={store}>
        <div className="d-flex">
            <BookNavigation />
            <div className="container-fluid wd-booksite-main">
                <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                    <Route path="Home" element={
                        <Home
                        courses={courses}
                        course={course}
                        setCourse={setCourse}
                        addNewCourse={addNewCourse}
                        deleteCourse={deleteCourse}
                        updateCourse={updateCourse}
                        resetCourse={resetCourse}/>
                    } />
                    <Route path="Courses/:courseId/*" element={<Courses courses={courses} />} />
                    <Route path="Inbox" element={<h1>Inbox</h1>} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/admin/users" element={<UserTable />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:id" element={<UserDetails />} />
                    <Route path="/account/:id" element={<Account />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/search/:search" element={<Search />} />
                    <Route path="/details/:bookId" element={<Details />}/>
                </Routes>
            </div>
        </div>
        </Provider>
            ); }
export default BookSite;

