import React, {useState, useEffect, useRef} from "react";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import * as userClient from "./users/client";
import * as likesClient from "./likes/client";
import * as reviewsClient from "./reviews/client";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {IoHeartDislike} from "react-icons/io5";
import {SlSpeech} from "react-icons/sl";
import {current} from "@reduxjs/toolkit";
import {findBookById} from "./client";

function Book() {
    const { bookId } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [review, setReview] = useState("");
    const [likes, setLikes] = useState([]);
    const [userLikes, setUserLikes] = useState();
    const [userLikesBook, setUserLikesBook] = useState(false);
    const [userReviewedBook, setUserReviewedBook] = useState(false);
    const [usersBookReview, setUsersBookReview] = useState(null);
    const [reviewUsername, setReviewUsername] = useState();
    const count = useRef(null);
    const [userReviews, setUsersReviews] = useState(null);


    const fetchUser = async () => {
        try {
            const user = await userClient.account();
            setCurrentUser(user);
            BookLikedByUser();
            fetchUserReview(user._id)
        } catch (error) {
            setCurrentUser(null);
        }
    };

    const fetchBook = async (bookId) => {
        try {
            const thisBook = await client.findBookById(bookId);
            setBook(thisBook);
            setAuthor(book.volumeInfo.authors);
        } catch (error) {
            console.log("didnt fetch a book")
            console.log(error)
        }
    };

    const fetchReviews = async (bookId) => {
        try {
            const bookReviews = await reviewsClient.findBookReviews(bookId);
            setReviews(bookReviews);

        } catch (error) {
            console.log("didnt fetch reviews")
            console.log(error)
        }
    };

    const fetchUserReview = async (id) => {
        try {
            const userReviewed = await reviewsClient.findReviewsByUser(id);
            if (userReviewed.some(e => e.bookId === bookId)) {
                setUserReviewedBook(true);
                setUsersBookReview((userReviewed.find(e => e.bookId === bookId)));

            } else {
                setUserReviewedBook(false);
            }
        } catch (error) {
            setLikes(null);
        }
    };

    const fetchLikes = async () => {
        try {
            const likes = await likesClient.findUsersThatLikeBook(bookId);
            setLikes(likes);
        } catch (error) {
            setLikes(null);
        }
    };

    const currentUserLikesBook = async () => {
        try {
            //await BookLikedByUser();
            if (currentUser && !userLikesBook) {
                const _likes = await likesClient.createUserLikesBook(
                    currentUser._id,
                    bookId
                );
                setLikes([_likes, ...likes]);
                BookLikedByUser();
            } else {}
        } catch (error) {
            console.log("User already likes")
        }
    };

    const findUserById = async (id) => {
        const user = await userClient.findUserById(id);
        const  username = user.username.toString();
        setReviewUsername(username);
    };


    const BookLikedByUser = async () => {
        if (currentUser) {
            const userLikes = await likesClient.findBooksThatUserLikes(currentUser._id)
            setUserLikes(userLikes)
            let likeBookTrue = userLikes.find(o => o.bookId === bookId);
            if (likeBookTrue) {
                setUserLikesBook( true);
            } else {
                setUserLikesBook(false);
            }
        }
    }


    const currentUserUnLikesBook = async () => {
        try {
            if (currentUser) { //&& userLikesBook) {
                const _likes = await likesClient.deleteUserLikesBook(
                    currentUser._id,
                    bookId,
                );
                setLikes([_likes, ...likes]);
                BookLikedByUser();
            } else {}
        } catch (error) {
            console.log("User already unlikes")
        }
    };

    const save = async () => {
        if (review) {
            await reviewsClient.createUserReviewsBook(currentUser._id, bookId, review);
        }
    };

    const edit = async () => {
        await reviewsClient.updateReview(bookId, currentUser._id, usersBookReview);
    };

    function filterDescription(description) {
       // description = description.replace('<b>','')
        //description = description.replace('</b>','')
       // description = description.replace('<i>','')
        //description = description.replace('</i>','')
        //description = description.replace('<br>','')
        //description = description.replace('</br>','')
        return(description)
    }


    useEffect(() => {
        if(count.current == null) {
            fetchBook(bookId);
            fetchUser();
            fetchLikes();
            fetchReviews(bookId);
            return () => {count.current = 1;}
        }

    }, []);


    return (
        <div>

            {book && (
                <div className={"row"}>

                    <div className={"d-none d-lg-block col col-auto wd-book-authTit book-info-pane "}>
                    <img className={"book-cover"}
                        src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=2&source=gbs_api`}
                        alt={book.volumeInfo.title}
                    />
                        <div className={'book-title'}>{book.volumeInfo.title}</div>
                        <Link to={`/BookSite/Author/${book.volumeInfo.authors}`}><h4>{book.volumeInfo.authors}</h4></Link>

                        <div className={"like-icons"}>
                            {currentUser && (
                                <div>
                                <FaHeart id={"likeButton"} style={{color: userLikesBook ? '#FF0000' : '#808080'}} size={50} className={"like-icon tw-cursor-pointer hover:tw-scale-105 tw-ease-in-out"} onClick={currentUserLikesBook} />

                        <IoHeartDislike id={"unlikeButton"} size={50} className={"unlike-icon likebuttongray tw-cursor-pointer hover:tw-scale-105 tw-ease-in-out"} onClick={currentUserUnLikesBook}/>
                            </div>
                                )}
                        </div>
                    </div>
                    <div className={"d-block d-lg-none col col-auto wd-book-title-sm  wd-book-authTit "}>
                        <img className={"book-cover"}
                             src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=2&source=gbs_api`}
                             alt={book.volumeInfo.title}
                        />
                        <h1>{book.volumeInfo.title}</h1>
                        <Link to={`/BookSite/Author/${book.volumeInfo.authors}`}><h4>{book.volumeInfo.authors}</h4></Link>

                        <div className={"like-icons"}>
                            {currentUser && (
                                <div>
                                    <FaHeart id={"likeButton"} style={{color: userLikesBook ? '#FF0000' : '#808080'}} size={50} className={"like-icon tw-cursor-pointer hover:tw-scale-105 tw-ease-in-out"} onClick={currentUserLikesBook} />

                                    <IoHeartDislike id={"unlikeButton"} size={50} className={"unlike-icon likebuttongray tw-cursor-pointer hover:tw-scale-105 tw-ease-in-out"} onClick={currentUserUnLikesBook}/>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={"d-none d-md-block book-spacer-lg"}></div>
                    <div className={"col wd-book-detail"}>
                        <div className={"book-details list-group"}>
                            <li className={"list-group-item"}>
                                <h6>Number of pages</h6>
                                {book.volumeInfo.pageCount}
                            </li>
                            <li className={"list-group-item tw-inline"}>
                                <h6>Categories</h6>
                                {book.volumeInfo.categories}
                            </li>
                            <li className={"list-group-item tw-inline"}>
                                <div className={"tw-inline"}>
                                    <h6>Publish Date</h6>
                                    {book.volumeInfo.publishedDate}
                                </div>
                                <div className={"tw-inline"}>
                                    <h6>Publisher</h6>
                                    {book.volumeInfo.publisher}
                                </div>

                            </li>

                            <li className={"list-group-item"}>
                                <h6>Description</h6>
                                {filterDescription(book.volumeInfo.description)}
                            </li>
                        </div>

                        <div className={"row "}>
                            <h4>User Ratings & Reviews </h4>
                            {currentUser && !userReviewedBook &&(
                                <>
                                    <input className={"form-control"} value={review} placeholder="Enter a review..."
                                           onChange={(e) => setReview(e.target.value)}/>
                                <button className={"btn btn-success"} onClick={save}>
                                Submit
                                </button>
                                    {review}
                                </>
                            )}
                            {currentUser && userReviewedBook &&(
                                <>
                                    <input className={"form-control"} value={usersBookReview.review}
                                           onChange={(e) => setUsersBookReview(e.target.value)}/>
                                    <button className={"btn btn-success"} onClick={edit}>
                                        Edit Review
                                    </button>
                                    {review}
                                </>
                            )}
                            <div className={"book-review-container list-group"}>
                                <div className={"list-group-item one-book-review"}>
                                    {reviews &&
                                     reviews.map((aReview, index) => (
                                         <>
                                             <Link to={`/Profile/${(aReview.user)}`} className={"review-user"}>{reviewUsername}</Link>
                                             <SlSpeech/>
                                             <div className={"review-body speech-bubble"}>{aReview.review}</div>
                                             <div className={"speech-bubble:after"}></div>

                                         </>
                                     ))}

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            )}
        </div>
    );
}

export default Book;