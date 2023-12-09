import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import * as userClient from "./users/client";
import * as likesClient from "./likes/client";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {IoHeartDislike} from "react-icons/io5";

function Book() {
    const { bookId } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState(null);
    const [likes, setLikes] = useState([]);
    const [userLikes, setUserLikes] = useState();
    const [userLikesBook, setUserLikesBook] = useState(false);

    const fetchUser = async () => {
        try {
            const user = await userClient.account();
            setCurrentUser(user);
            BookLikedByUser();
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

    const BookLikedByUser = async () => {
        if (currentUser) {
            const userLikes = await likesClient.findBooksThatUserLikes(currentUser._id)
            setUserLikes(userLikes)
            let likeBookTrue = userLikes.find(o => o.bookId === bookId);
            if (likeBookTrue) {
                console.log("should be setting to true")
                setUserLikesBook( true);
                console.log(userLikesBook)
                console.log("WHAT THE FUZZ?")
            } else {
                setUserLikesBook(false);
            }
        }
    }


    const currentUserUnLikesBook = async () => {
        try {
            console.log('checking if user likes book')
            console.log(userLikesBook)
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

    function filterDescription(description) {
        description = description.replace('<b>','')
        description = description.replace('</b>','')
        description = description.replace('<i>','')
        description = description.replace('</i>','')
        description = description.replace('<br>','')
        description = description.replace('</br>','')
        return(description)
    }


    useEffect(() => {
        fetchBook(bookId);
        fetchUser();
        fetchLikes();

    }, []);

    return (
        <div>

            {book && (
                <div className={"row"}>

                    <div className={"col col-auto wd-book-authTit book-info-pane "}>
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
                        <div className={"row"}>
                            <h4> Author's Comment</h4>
                            {currentUser && author && currentUser.role === "AUTHOR" &&  author.includes(currentUser.firstName) && author.includes(currentUser.lastName) && (
                                <>
                                    <h1>Hi Author, this is your page</h1>
                                </>

                            )}

                        </div>
                        <div className={"row "}>
                            <h4>User Ratings & Reviews </h4>
                            Data model complexity requirements
                            The following are requirements about the number of tables, classes, and relationships between the various data entities
                            1. At least two domain object models - create a schema to capture information about your particular domain. For instance, if your domain is movies, then the schema might have properties such as title, rating, date, directors, actors, etc (3 domains for graduate students)
                            2. At least two user models - each user type or role should have its own distinct set of attributes. They can have some common attributes, but they have to have at least one attribute that is distinct to the user type or role. (3 user models for graduate students)
                            3. At least one one to many relationship between domain objects, or between users, or between users and domain objects - for instance, a movie has a one to many relation with actors, e.g., one movie has many actors. You can decide whether the schemas are embedded or not. (2 one to many relations for graduate students)
                            4. At least one many to many relationship between domain objects, or between users, or between users and domain objects - create a schema that can map several records in different tables or collections. (2 many to many for graduate students)
                            Data model complexity requirements
                            The following are requirements about the number of tables, classes, and relationships between the various data entities
                            1. At least two domain object models - create a schema to capture information about your particular domain. For instance, if your domain is movies, then the schema might have properties such as title, rating, date, directors, actors, etc (3 domains for graduate students)
                            2. At least two user models - each user type or role should have its own distinct set of attributes. They can have some common attributes, but they have to have at least one attribute that is distinct to the user type or role. (3 user models for graduate students)
                            3. At least one one to many relationship between domain objects, or between users, or between users and domain objects - for instance, a movie has a one to many relation with actors, e.g., one movie has many actors. You can decide whether the schemas are embedded or not. (2 one to many relations for graduate students)
                            4. At least one many to many relationship between domain objects, or between users, or between users and domain objects - create a schema that can map several records in different tables or collections. (2 many to many for graduate students)
                            Data model complexity requirements
                            The following are requirements about the number of tables, classes, and relationships between the various data entities
                            1. At least two domain object models - create a schema to capture information about your particular domain. For instance, if your domain is movies, then the schema might have properties such as title, rating, date, directors, actors, etc (3 domains for graduate students)
                            2. At least two user models - each user type or role should have its own distinct set of attributes. They can have some common attributes, but they have to have at least one attribute that is distinct to the user type or role. (3 user models for graduate students)
                            3. At least one one to many relationship between domain objects, or between users, or between users and domain objects - for instance, a movie has a one to many relation with actors, e.g., one movie has many actors. You can decide whether the schemas are embedded or not. (2 one to many relations for graduate students)
                            4. At least one many to many relationship between domain objects, or between users, or between users and domain objects - create a schema that can map several records in different tables or collections. (2 many to many for graduate students)
                            Data model complexity requirements
                            The following are requirements about the number of tables, classes, and relationships between the various data entities
                            1. At least two domain object models - create a schema to capture information about your particular domain. For instance, if your domain is movies, then the schema might have properties such as title, rating, date, directors, actors, etc (3 domains for graduate students)
                            2. At least two user models - each user type or role should have its own distinct set of attributes. They can have some common attributes, but they have to have at least one attribute that is distinct to the user type or role. (3 user models for graduate students)
                            3. At least one one to many relationship between domain objects, or between users, or between users and domain objects - for instance, a movie has a one to many relation with actors, e.g., one movie has many actors. You can decide whether the schemas are embedded or not. (2 one to many relations for graduate students)
                            4. At least one many to many relationship between domain objects, or between users, or between users and domain objects - create a schema that can map several records in different tables or collections. (2 many to many for graduate students)

                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Book;