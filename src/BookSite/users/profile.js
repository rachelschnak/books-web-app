import * as client from "./client";
import * as bookClient from "../client";
import React, { useState, useEffect } from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css"
import {CgProfile} from "react-icons/cg";
import * as likesClient from "../likes/client";
import {findBookById} from "../client";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";

function Profile() {
    const {id} = useParams();
    const [profile, setProfile] = useState(null);
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const [likes, setLikes] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);
    const fetchAccount = async () => {
        try {
            const account = await client.account();
            setAccount(account);

        } catch (error) {
            console.log(error)
        }
    };

    const fetchProfile = async (id) => {
        try {
            const thisprofile = await client.findUserById(id);
            setProfile(thisprofile);
            if (!thisprofile) {
                navigate("/BookSite/")
            } else {
                fetchBooksUserLikes(thisprofile._id)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const save = async () => {
        await client.updateUser(account._id, account);
    };

    const signout = async () => {
        await client.signout();
        navigate("/BookSite/signin");
    };

    const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
    };

    const fetchBooksUserLikes = async (userId) => {
        try {
            const likes = await likesClient.findBooksThatUserLikes(userId);
            for(const each in likes) {
                const bookId = likes[each].bookId;
                fetchBooks(bookId);
            }
            setLikes(likes);
        } catch (error) {
            setLikes(null);
        }
    };


    const fetchBooks = async (bookId) => {
        try {
            const book = await findBookById(bookId)
            setLikedBooks(likedBooks => [...likedBooks, book])
        } catch (error) {
            console.log("didn't fetch any liked books")
        }
    };

    const slideLeft =  () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight = () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }


    useEffect(() => {
        fetchProfile(id);
        fetchAccount();
    }, []);

    const links = ["Account", "Signin", "Register"];
    const { pathname } = useLocation();




    return (

        <div className={"row"}>
            <div className="list-group wd-kanbas-user-navigation col-auto d-none d-lg-block">
                {account && (
                    <>
                        <Link to={`/BookSite/Profile/${account._id}`} className="list-group-item books-profile-link-active">
                            Profile
                        </Link>
                    </>
                )}
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={`/BookSite/${link}`}
                        className={`list-group-item ${pathname.includes(link) && "active"}`}>
                        {link}
                    </Link>
                ))}
                {account && account.role === "ADMIN" && (
                    <>
                        <Link to="/BookSite/admin/users" className="list-group-item books-users-link">
                            Users
                        </Link>
                    </>)}
            </div>

            {profile && (
                <>

            <div className=" col-3 w-50 wd-kanbas-user-content d-block">

                    <div className={'row'}>
                        <div className={'col'}>
                        <h1>{profile.username}'s Profile

                            {account && id === account._id && (
                                <>
                            <button className={"btn btn-warning float-end"} onClick={signout}>
                                Signout
                            </button>
                            <button className={"btn btn-primary float-end"} onClick={() => navigate(`/BookSite/account/${account._id}`)}>
                                Edit Account
                            </button>

                                </>  )}

                        </h1>

                        <h5>Username: {profile.username}</h5>
                        <h5>Email: {profile.email}</h5>
                        <h5>Role: {profile.role}</h5>
                        <h3>Liked Books</h3>
                        <div className={'tw-relative tw-items-center tw-flex book-h-list'}>
                            <MdChevronLeft onClick={slideLeft} size={100} className={'tw-opacity-50 tw-cursor-pointer hover:tw-opacity-100 book-scroll '} />
                            <div id={"slider"} className={'tw-w-auto tw-h-full tw-overflow-scroll tw-scroll tw-whitespace-nowrap tw-scroll-smooth tw-scrollbar-hide'}>
                                {likedBooks &&
                                 likedBooks.map((book, index) => (

                                     <Link to={`/BookSite/book/${(book.id)}`}>
                                         <img className={'tw-inline-block tw-cursor-pointer hover:tw-scale-105 tw-ease-in-out tw-duration-300 book-h-list-item'}
                                              src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                                              alt={``}
                                         />
                                     </Link>

                                 ))}

                            </div>
                            <MdChevronRight size={100} onClick={slideRight} className={'tw-opacity-50 tw-cursor-pointer hover:tw-opacity-100 '} />
                        </div>
                    </div>

                        <h3>Book Lists</h3>
                        <div className={'col'}>
                        <h3> friends </h3>
                        {account && account.role === "ADMIN" && (
                            <Link to="/BookSite/admin/users" className="btn btn-warning w-100">
                                Users
                            </Link>

                        )}
                    </div>
                    </div>
                 </div>
                </>
            )}
        </div>
    ); }
export default Profile;