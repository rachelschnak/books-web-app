import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {BiSolidUserCircle} from "react-icons/bi";
import {LuBookMinus} from "react-icons/lu";
import {FaHome, FaRegCalendarAlt} from "react-icons/fa";
import {SlEnvolopeLetter} from "react-icons/sl";
import "./index.css";
import {useEffect, useState} from "react";
import * as userClient from "../users/client";


function BookNavigation() {
    const links = ["Home", "Courses", "Inbox", "Profile",];
    const linkToIconMap = {
        Home: <FaHome className="wd-icon" />,
        Courses: <LuBookMinus className="wd-icon" />,
        Calendar : <FaRegCalendarAlt className="wd-icon" />,
        Inbox: <SlEnvolopeLetter className="wd-icon" />,
        Profile: <BiSolidUserCircle className="wd-icon wd-account-icon" />,
    };
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState( "");

    const [currentUser, setCurrentUser] = useState(null);

    const fetchUser = async () => {
        try {
            const user = await userClient.account();
            setCurrentUser(user);
        } catch (error) {
            setCurrentUser(null);
        }
    };


useEffect(() => {fetchUser()},[])


    return (
        <nav className="navbar navbar-expand-lg bg-light fixed-top booksy-navbar">
            <div className="container-fluid booksy-navbar">
                <a className="navbar-brand">Booksy</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 list-group">

            {links.map((link, index) => (
                <Link
                    key={index}
                    to={`/BookSite/${link}`}
                    className={`list-group-item ${pathname.includes(link) && "active"}`}>
                    {linkToIconMap[link]}
                    {link}
                </Link>
            ))}
                        {currentUser && (
                            <>
                        <Link to={`/BookSite/Profile/${currentUser._id}`} > {currentUser.username} </Link>
                            </>  )}

                    </ul>
                    <form className="d-flex" role="search">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="search"
                            value={searchTerm}
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                            }}
                        />
                        <button
                            onClick={() => navigate(`/BookSite/search/${searchTerm}`)}
                            className="btn btn-outline-success"
                        >Search</button>

                    </form>
                </div>
            </div>
        </nav>

    ); }
export default BookNavigation;