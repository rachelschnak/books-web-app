import * as client from "./client";
import * as bookClient from "../client";
import React, {useState, useEffect, useRef} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css"
import {CgProfile} from "react-icons/cg";
import * as likesClient from "../likes/client";
import * as followsClient from "../followers/client";
import {findBookById} from "../client";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import * as reviewsClient from "../reviews/client";
import {createUserReviewsBook} from "../reviews/client";
import * as statusClient from "../BookStatus/client";

function Profile() {
    const {id} = useParams();
    const [profile, setProfile] = useState(null);
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const [likes, setLikes] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);
    const [usersReviews, setUsersReviews] = useState(null)
    const count = useRef(null);
    const [booksStatus, setBooksStatus] = useState([]);
    const [readBooks, setReadBooks] = useState([]);
    const [readingBooks, setReadingBooks] = useState([]);
    const [wantReadBooks, setWantReadBooks] = useState([]);

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
                await fetchBooksUserLikes(thisprofile._id)
                await fetchBooksStatus(thisprofile._id)
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

    const follow = async () => {
        await followsClient.userFollowsUser(id);
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

    const fetchBookById = async (bookId) => {
        try {
            const book = await findBookById(bookId)
            return book
        } catch (error) {
            console.log("didn't fetch any liked books")
        }
    };

    const fetchBooksStatus = async(userId) => {
        try{
            const bookStat = await statusClient.findBookStatusesOfUser(userId);
            for (const each in bookStat) {
                bookStat[each].book = await fetchBookById(bookStat[each].bookId)
            }
            setBooksStatus(bookStat);
            getReadBooks(bookStat)
        } catch (error) {
            console.log("Error getting book status")
        }
    }

    const getReadBooks = async (booksStatus) => {
        for( const each in booksStatus) {
            if (booksStatus[each].bookStatus === 'READ') {
                setReadBooks(readBooks => [...readBooks, booksStatus[each]])
            }
            if (booksStatus[each].bookStatus === 'WANT TO READ') {
                setWantReadBooks(wantReadBooks => [...wantReadBooks, booksStatus[each]])
            }
            if (booksStatus[each].bookStatus === 'READING') {
                setReadingBooks(readingBooks => [...readingBooks, booksStatus[each]])
            }
        }
    }

    const fetchReviews = async(userId) => {
        try{
            const reviews = await reviewsClient.findReviewsByUser(userId);
            for (const each in reviews) {
                reviews[each].book = await findBookById(reviews[each].bookId)
            }
            setUsersReviews(reviews);
        } catch(error){
            console.log('hit a snag fetching user reviews')
        }
    }

    const slideLeft =  () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight = () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }


    useEffect(() => {

        if(count.current == null) {
            fetchProfile(id);
            fetchAccount();
            fetchReviews(id);
            return () => {count.current = 1;}
        }

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

            <div className=" col wd-kanbas-user-content d-block">

                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className={'profile-header profile-header-main'}>{profile.username}'s Profile</div>
                            {account && id === account._id && (
                                <>
                                    <button className={"btn btn-warning prof-btn profile-button-1 float-end"} onClick={signout}>
                                        Signout
                                    </button>
                                    <button className={"btn btn-primary prof-btn profile-button-2 float-end"} onClick={() => navigate(`/BookSite/account/${account._id}`)}>
                                        Edit Account
                                    </button>

                                </>  )}

                            <button className={'btn btn-success prof-btn btn-followers inline float-end'} onClick={() => navigate(`/BookSite/Profile/${profile._id}/followList`)}>
                                Following
                            </button>

                            <h5>Username: {profile.username}</h5>
                            <h5>Email: {profile.email}</h5>
                            <h5>Role: {profile.role}</h5>


                            {account && id !== account._id && (
                                <>
                                    <button className={"btn btn-warning profile-button-3"} onClick={follow}>
                                        Follow
                                    </button>
                                </>  )}



                            <div className={'profile-subheader'}>Liked Books</div>
                            <div className={'liked-book-slider'}>

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
                        </div>


                        <div className={'flex-wrap col-lg'}>

                            <div className={'profile-header'}>Book Shelf</div>

                            <div className={'home-book-shelf-profile'}>
                                {account && (
                                    <>
                                        <div className={'row'}>
                                            <h5>Reading</h5>
                                            <ul  className={'list-group'}>
                                                {readingBooks &&
                                                 readingBooks.map((book, index)=> (

                                                     <li className={'list-group-item'}>
                                                         <Link to={`/BookSite/book/${(book.bookId)}`}>
                                                             <h6>{book.book.volumeInfo.title}</h6>
                                                         </Link>
                                                     </li>

                                                 ))}
                                            </ul>
                                        </div>
                                        <div className={'row'}>
                                            <h5>Read Books</h5>
                                            <ul  className={'list-group'}>
                                                {readBooks &&
                                                 readBooks.map((book, index)=> (

                                                     <li className={'list-group-item'}>
                                                         <Link to={`/BookSite/book/${(book.bookId)}`}>
                                                             <h6>{book.book.volumeInfo.title}</h6>
                                                         </Link>
                                                     </li>

                                                 ))}
                                            </ul>
                                        </div>
                                        <div className={'row'}>
                                            <h5>Want to Read</h5>
                                            <ul  className={'list-group'}>
                                                {wantReadBooks &&
                                                 wantReadBooks.map((book, index)=> (

                                                     <li className={'list-group-item'}>
                                                         <Link to={`/BookSite/book/${(book.bookId)}`}>
                                                             <h6>{book.book.volumeInfo.title}</h6>
                                                         </Link>
                                                     </li>

                                                 ))}
                                            </ul>
                                        </div>

                                    </>
                                )}
                            </div>

                        </div>
                        <div className={'flex-wrap col-lg-7'}>
                            <div className={'profile-header'}>Reviews</div>
                            <div className={'list-group profile-list'}>
                                {usersReviews &&
                                 usersReviews.map((review, index) => (

                                     <Link to={`/BookSite/book/${(review.bookId)}`} className={'profile-list list-group-item'}>
                                        <h4>{review.book.volumeInfo.title} </h4>
                                          {review.review}
                                     </Link>

                                 ))}
                            </div>
                        </div>




                    </div>
                 </div>
                </>
            )}
        </div>
    ); }
export default Profile;