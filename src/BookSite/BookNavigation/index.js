import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {BiSolidUserCircle} from "react-icons/bi";
import {LuBookMinus} from "react-icons/lu";
import {FaHome, FaRegCalendarAlt} from "react-icons/fa";
import {SlEnvolopeLetter} from "react-icons/sl";
import "./index.css";
import {useEffect, useState} from "react";
import * as userClient from "../users/client";


function BookNavigation() {
    const links = ["Home", "Account",];
    const linkToIconMap = {
        Home: <FaHome className="wd-icon" />,
        Account: <BiSolidUserCircle className="wd-icon wd-account-icon" />,
    };
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState( "");
    const [currentUser, setCurrentUser] = useState(null);


    const fetchUser = async () => {
        try {
            const user = await userClient.account();
            if (user) {
                setCurrentUser(user);
            }

        } catch (error) {
            setCurrentUser(null);
        }
    };


useEffect(() => {
    fetchUser()
},[])


    return (
        <nav className="navbar navbar-expand-lg bg-light fixed-top booksy-navbar">
            <div className="container-fluid booksy-navbar">
                <a className="navbar-title" href={`/BookSite`}>Booksy</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 list-group navbarlinks">

                        <Link
                            to={`/BookSite`}
                            className={`list-group-item ${pathname.includes('Home') && "active"}`}>
                            <FaHome/>
                            Home
                        </Link>
                        {currentUser && (
                            <Link
                                to={`/BookSite/Profile/${currentUser._id}`}
                                onClick={fetchUser}
                                className={`list-group-item ${pathname.includes('Profile') && "active"}`}>
                                <BiSolidUserCircle/>
                                Account
                            </Link>
                        )}
                        {!currentUser && (
                            <Link
                                to={`/BookSite/Signin`}

                                className={`list-group-item ${pathname.includes('Signin') && "active"}`}>
                                <BiSolidUserCircle/>
                                Account
                            </Link>
                        )}
                    </ul>
                    <ul className="navbar-nav me-auto d-block d-md-block d-lg-none mb-lg-0 list-group">
                            <Link
                                to={`/BookSite/Signin`}
                                className={`list-group-item ${pathname.includes('SignIn') && "active"}`}>
                                SignIn
                            </Link>
                        <Link
                            to={`/BookSite/Register`}
                            className={`list-group-item ${pathname.includes('Register') && "active"}`}>
                            Register
                        </Link>

                        {currentUser && currentUser.role === "ADMIN" && (

                                <Link to="/BookSite/admin/users" className={`list-group-item ${pathname.includes('Users') && "active"}`}>
                                    Users
                                </Link>
                            )}

                    </ul>

                    <form className="d-flex nav-seach-bar" role="search">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="search books"
                            value={searchTerm}
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                            }}
                        />
                        <button
                            onClick={() => navigate(`/BookSite/search/${searchTerm}`)}
                            className="btn btn-outline-success btn-search-navbar"
                        >Search</button>

                    </form>
                </div>
            </div>
        </nav>

    ); }
export default BookNavigation;