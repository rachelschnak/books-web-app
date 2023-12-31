import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import * as client from "./client";
import * as userClient from "./users/client";
import * as likesClient from "./likes/client";
import * as reviewsClient from "./reviews/client";
import * as statusClient from "./BookStatus/client";
import * as authorCommentClient from "./Author/client";
import {FaHeart, FaPencilAlt, FaRegTrashAlt} from "react-icons/fa";
import {IoHeartDislike} from "react-icons/io5";
import {SlSpeech} from "react-icons/sl";


function Book() {
    const { bookId } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [review, setReview] = useState("");
    const [likes, setLikes] = useState([]);
    const [userLikes, setUserLikes] = useState();
    const [userLikesBook, setUserLikesBook] = useState(false);
    const [userReviewedBook, setUserReviewedBook] = useState(false);
    const [usersBookReview, setUsersBookReview] = useState(null);
    const [reviewUsername, setReviewUsername] = useState();
    const [bookStatus, setBookStatus] = useState();
    const count = useRef(null);
    const [userReviews, setUsersReviews] = useState(null);
    const [statusExists, setStatusExists] = useState(false);
    const [NYTreviews, setNYTReviews] = useState(null);
    const [authorComment, setAuthorComment] = useState(null);
    const [aCommentExists, setACommentExists] = useState(false);


    const fetchUser = async () => {
        try {
            const user = await userClient.account();
            setCurrentUser(user);
            await BookLikedByUser();
            await fetchUserReview(user._id)
            await fetchBookStatus(user._id)


        } catch (error) {
            setCurrentUser(null);
        }
    };

    const fetchBook = async (bookId) => {
        try {
            const thisBook = await client.findBookById(bookId)
            setBook(thisBook);
            fetchNYTReviews(thisBook.volumeInfo.title)
        } catch (error) {
            console.log("didnt fetch a book")
            console.log(error)
        }
    };

    const fetchStatusTransfer = async () => {
        try{
            const bookStat = await statusClient.getBookStatusOfUser(currentUser._id, bookId);
            setBookStatus(bookStat);
            if (bookStat.length > 0 ) {
                setStatusExists(true)
            }
        } catch (error) {
            console.log("Error getting book status")
        }
    }

    const fetchAuthorComment = async(bookId) => {
        try{
            const aComment = await authorCommentClient.findAuthorComment(bookId);
            if (aComment) {
                setAuthorComment(aComment)
                setACommentExists(true)
            }
        } catch (error) {
            console.log("Error getting book status")
        }
    }

    const fetchBookStatus = async(userId) => {
        try{
            const bookStat = await statusClient.getBookStatusOfUser(userId, bookId);
            setBookStatus(bookStat);
            if (bookStat.length > 0 ) {
                setStatusExists(true)
            }
        } catch (error) {
            console.log("Error getting book status")
        }
    }



    const fetchReviews = async (bookId) => {
        try {
            const bookReviews = await reviewsClient.findBookReviews(bookId);
            if (bookReviews) {
                for (const each in bookReviews) {
                    bookReviews[each].fullUser = await findUserById(bookReviews[each].user)
                }

                setReviews(bookReviews);
            }

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

    const fetchNYTReviews = async (bookTitle) => {
        try{
            const NYTBReviews = await client.findNYTBookReviews(bookTitle);
            if (NYTBReviews.results.length > 0 ) {

                setNYTReviews(NYTBReviews.results[0]);
            }
        }catch (error) {
            console.log('failed to fetch NYT reviews')
        }
    }

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
       return user;

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

    const currentUserSetsBookStatus = async() => {
        console.log(statusExists)
        if (currentUser && statusExists) {
            await statusClient.updateBookStatus(currentUser._id, bookId, bookStatus)

        } else if (currentUser && !statusExists) {
            await statusClient.createUserBookStatus(currentUser._id, bookId, bookStatus)
        setStatusExists(true)
        }

    }

    const currentUserRemovesBookStatus = async() => {
        try {
            if (currentUser) {
               statusClient.deleteUserBookStatus(currentUser._id, bookId)
                setStatusExists(false)
            }
        } catch (error) {
            console.log('Error deleting read status')
        }
    }

    const save = async () => {
        if (review) {
            await reviewsClient.createUserReviewsBook(currentUser._id, bookId, review);
            fetchReviews(bookId);
        }
    };

    const saveAuthorComment = async () => {
        if (authorComment) {
            await authorCommentClient.createAuthorComment(currentUser._id, bookId, authorComment);
            await fetchAuthorComment(bookId);
        }
    };

    const editAuthorComment = async () => {
        if (authorComment) {
            await authorCommentClient.updateAuthorComment(currentUser._id, bookId, authorComment);
            await fetchAuthorComment(bookId);
        }
    };

    const deleteAuthorComment = async () => {
        if (authorComment) {
            await authorCommentClient.deleteAuthorComment(currentUser._id, bookId);
            await fetchAuthorComment(bookId);
            setACommentExists(false)
        }
    };

    const edit = async () => {
        await reviewsClient.updateReview(bookId, currentUser._id, usersBookReview);
        fetchReviews(bookId);
    };

    const deleteReview = async () => {
        await reviewsClient.deleteUserReviewsBook(currentUser._id, bookId);
        fetchReviews(bookId);
    };

    const adminDeleteReview = async(userId) => {
        await reviewsClient.deleteUserReviewsBook(userId, bookId);
        fetchReviews(bookId);
    }

    function filterDescription(description) {
        document.getElementById('desc-html').innerHTML = description;
    }

    useEffect(() => {
        fetchReviews(bookId);
        fetchAuthorComment(bookId);
        if(count.current == null) {
            fetchBook(bookId);
            fetchUser();
            fetchLikes();
            return () => {count.current = 1;}
        }
        if (book) {
            filterDescription(book.volumeInfo.description);
        }
        if(likes) {
            BookLikedByUser();
        }
    }, [book, review, statusExists, bookStatus]);



    return (
        <div className={'book-page-all'}>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Update Bookshelf</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body ">
                            <div className={'row'}>
                            <select className={"book-status-fields form-control"}
                                    onChange={(e) => setBookStatus({...bookStatus,
                                                                       bookStatus: e.target.value })}>
                                <option value="READ">Read</option>
                                <option value="WANT TO READ">Want to Read</option>
                                <option value="READING">Reading</option>
                                <option value="DNF">DNF</option>
                            </select>
                            </div>
                            <div className={'row'}>
                            <button type="button" className="btn btn-danger rmv-btn" onClick={currentUserRemovesBookStatus} data-bs-dismiss="modal"> <FaRegTrashAlt /> Remove from Bookshelf</button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={fetchStatusTransfer}>Close</button>
                            <button type="button" className="btn btn-primary review-edit-btn" onClick={currentUserSetsBookStatus} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            {book && (
                <div className={"row"}>

                    <div className={"d-none d-lg-block col col-auto wd-book-authTit book-info-pane "}>
                        <img className={"book-cover"}
                             src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=2&source=gbs_api`}
                             alt={`http://books.google.com/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=2&source=gbs_api`}
                        />
                        <div className={'book-title'}>{book.volumeInfo.title}</div>
                        <Link to={`/BookSite/Author/${book.volumeInfo.authors}`}><h4>{book.volumeInfo.authors}</h4></Link>
                        {currentUser &&(
                            <div className={'readerBookStatus'}>

                                <button id={"bookStatusBtn"} type="button" className="btn btn-primary bookStatusBtn" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                                    {bookStatus &&(
                                        <> <FaPencilAlt /> {bookStatus.bookStatus}</>
                                    )}
                                    {!bookStatus &&(
                                        <> Add to Bookshelf</>
                                    )}
                                </button>

                            </div>
                        )}


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
                        <Link  to={`/BookSite/Author/${book.volumeInfo.authors}`}><h4>{book.volumeInfo.authors}</h4></Link>

                        {currentUser &&(
                            <div className={'readerBookStatus'}>


                                <button id={"bookStatusBtn"} type="button" className="btn btn-primary bookStatusBtn" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                                    {bookStatus &&(
                                        <>{bookStatus.bookStatus}</>
                                    )}
                                    {!bookStatus &&(
                                        <>Add to Bookshelf</>
                                    )}
                                </button>

                            </div>
                        )}


                        <div className={"like-icons"}>
                            {currentUser && (
                                <div>
                                    <FaHeart id={"likeButton"} style={{color: userLikesBook ? '#FF0000' : '#808080'}} size={50} className={"like-icon tw-cursor-pointer hover:tw-scale-105 tw-ease-in-out"} onClick={currentUserLikesBook} />

                                    <IoHeartDislike id={"unlikeButton"} size={50} className={"unlike-icon likebuttongray tw-cursor-pointer hover:tw-scale-105 tw-ease-in-out"} onClick={currentUserUnLikesBook}/>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={"d-none d-lg-block book-spacer-lg"}></div>
                    <div className={"d-none d-sm-block d-lg-none book-spacer-sm"}></div>
                    <div className={"col wd-book-detail"}>
                        <div className={"book-details list-group"}>
                            <li className={"list-group-item"}>
                                <div className={'row'}>
                                <div className={'col'}>
                                <h6>Number of pages</h6>
                                {book.volumeInfo.pageCount}
                                </div>
                                <div className={'col'}>
                                    <h6>Publish Date</h6>
                                    {book.volumeInfo.publishedDate}
                                    <h6>Publisher</h6>
                                    {book.volumeInfo.publisher}

                                </div>
                                </div>
                            </li>
                            <li className={"list-group-item tw-inline"}>
                                <h6>Categories</h6>
                                {book.volumeInfo.categories}
                            </li>
                            <li className={"list-group-item book-description-box"}>
                                <h6>Description</h6>
                                <div id={"desc-html"}>
                                    hi
                                </div>
                            </li>
                        </div>


                        {!aCommentExists && currentUser && currentUser.role === 'AUTHOR' && book.volumeInfo.authors[0].includes(currentUser.firstName) && book.volumeInfo.authors[0].includes(currentUser.lastName) && (

                            <div className={'AuthorCommentBlock'}>
                                <h4>Author Comment</h4>
                                <textarea className={"form-control review-text"} placeholder="Enter your comment..."
                                          onChange={(e) => setAuthorComment(e.target.value)}/>
                                <button className={"btn btn-success review-buttons review-edit-btn float-end"} onClick={saveAuthorComment}>
                                    Submit
                                </button>

                            </div>
                        )}

                        {aCommentExists && currentUser && currentUser.role === 'AUTHOR' && book.volumeInfo.authors[0].includes(currentUser.firstName) && book.volumeInfo.authors[0].includes(currentUser.lastName) && (

                            <div className={'AuthorCommentBlock'}>
                                <h4>Author Comment</h4>
                                <textarea className={"form-control review-text"} value={authorComment.comment} placeholder="Enter your comment..."
                                          onChange={(e) => setAuthorComment(e.target.value)}/>

                                <button className={"btn btn-success review-buttons review-edit-btn float-end"} onClick={editAuthorComment}>
                                    Edit
                                </button>
                                <button className={"btn btn-danger review-buttons review-delete-btn float-end"} onClick={deleteAuthorComment}>
                                    Delete
                                </button>

                            </div>
                        )}

                        {aCommentExists && currentUser && !book.volumeInfo.authors[0].includes(currentUser.firstName) && !book.volumeInfo.authors[0].includes(currentUser.lastName) && (
                            <div className={'AuthorCommentBlock'}>
                                <h4>Author's Comment</h4>
                                <div className={'authorCommentBlock'}>{authorComment.comment}</div>
                            </div>
                        )}

                        {aCommentExists && !currentUser && (

                            <div className={'AuthorCommentBlock'}>
                                <h4>Author's Comment</h4>
                                <div className={'authorCommentBlock'}>{authorComment.comment}</div>
                            </div>
                        )}

                        <div className={"row "}>
                            <h4>Reviews </h4>

                                <div className={'NYT-reviews'}>

                                    <div className={"book-review-container list-group"}>

                                        {NYTreviews && (
                                            <Link to={NYTreviews.url}>
                                            <div className={"list-group-item one-book-review"}>
                                                <div className={'NYT-review-user-row NYT-review-user'}>
                                                    New York Times - {NYTreviews.byline}
                                                </div>
                                                <div className={"NYT-review-body"}>
                                                    {NYTreviews.summary}
                                                </div>

                                            </div>
                                            </Link>
                                        )}

                                        {!NYTreviews && (
                                            <div className={"list-group-item one-book-review"}>
                                                <div className={'NYT-review-user-row'}> </div>
                                                    <div className={"NYT-review-body"}>
                                        No New York Times review</div>
                                            </div>
                                        )}


                                    </div>
                                </div>


                            <div className={'user-reviews'}>
                            {currentUser && !userReviewedBook && (currentUser.role !== "AUTHOR" &&  !book.volumeInfo.authors[0].includes(currentUser.firstName) && !book.volumeInfo.authors[0].includes(currentUser.lastName)) && (
                                <>
                                    <div className={'review-box-and-buttons'}>
                                    <textarea className={"form-control review-text"} value={review} placeholder="Enter a review..."
                                           onChange={(e) => setReview(e.target.value)}/>
                                    <button className={"btn btn-success review-buttons review-edit-btn float-end"} onClick={save}>
                                        Submit
                                    </button>
                                    </div>
                                </>
                            )}
                            {currentUser && userReviewedBook &&(
                                <>
                                    <div className={'review-box-and-buttons'}>

                                    <textarea className={"form-control review-text"} value={usersBookReview.review}
                                           onChange={(e) => setUsersBookReview(e.target.value)}/>


                                    <button className={"btn btn-success review-buttons review-edit-btn float-end"} onClick={edit}>
                                        Edit
                                    </button>
                                    <button className={"btn btn-danger review-buttons review-delete-btn float-end "} onClick={deleteReview}>
                                        Delete
                                    </button>


                                    </div>
                                </>
                            )}
                                <div>
                            <div className={"book-review-container list-group"}>

                                    {reviews &&
                                     reviews.map((aReview, index) => (
                                         <div className={"list-group-item one-book-review"}>

                                            <div className={'review-user-row'}>
                                            <Link to={`/BookSite/Profile/${(aReview.user)}`} className={"review-user"}>{aReview.fullUser.username}</Link>
                                             <SlSpeech/>
                                                {currentUser && currentUser.role === 'ADMIN' && (
                                                    <button className={'btn btn-danger Areview-delete-btn float-end'} onClick={function(){adminDeleteReview(aReview.user)}}>Delete User Review</button>
                                                )}

                                            </div>
                                             <div className={"review-body"}>{aReview.review}
                                             </div>


                                         </div>

                                     ))}

                                {!reviews && (
                                    <div className={"list-group-item one-book-review"}>
                                        <div className={'review-user-row'}>
                                            No user reviews...yet!
                                        </div>
                                    </div>

                                )}

                        </div>
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