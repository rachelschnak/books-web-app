import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import * as userClient from "./users/client";
import * as likesClient from "./likes/client";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {hover} from "@testing-library/user-event/dist/hover";

function Book() {
    const [currentUser, setCurrentUser] = useState(null);
    const [book, setBook] = useState(null);
    //const [tracks, setTracks] = useState([]);
    const { bookId } = useParams();
    const [likes, setLikes] = useState([]);

    const fetchUser = async () => {
        try {
            const user = await userClient.account();
            setCurrentUser(user);
        } catch (error) {
            setCurrentUser(null);
        }
    };

    const fetchBook = async () => {
        try {
            const book = await client.findBookById(bookId);
            setBook(book);
        } catch (error) {
            console.log("didnt fetch a book")
        }
    };



    /*const fetchTracks = async () => {
        const tracks = await client.findTracksByAlbumId(albumId);
        setTracks(tracks);
    };*/

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
            const _likes = await likesClient.createUserLikesBook(
                currentUser._id,
                bookId
            );
            setLikes([_likes, ...likes]);
        } catch (error) {
            console.log("User already likes")
        }
    };

    /*function isLiked() {
        if (currentUserLikesBook()) {
            return(<FaHeart />)
        } else {
            return(<FaRegHeart />)
        }
    }*/

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
        fetchBook();
        //fetchTracks();
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
                        <h4>{book.volumeInfo.authors}</h4>
                        <div className={"like-icon"}>{currentUser && (
                                <FaHeart onClick={currentUserLikesBook} />

                        )}
                        </div>
                    </div>

                    <div className={"col wd-book-detail"}>
                        <h3>Number of Likes</h3>
                        <h6>Publish Date</h6>
                        {book.volumeInfo.publisher}
                        {book.volumeInfo.publishedDate}
                        <h6>Number of pages</h6>
                        {book.volumeInfo.pageCount}
                        <h6>Categories</h6>
                        {book.volumeInfo.categories}

                        <div className={"row "}>
                            <h4>Description</h4>
                            <div>{filterDescription(book.volumeInfo.description)}</div>
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