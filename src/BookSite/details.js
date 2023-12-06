import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import * as userClient from "./users/client";
import * as likesClient from "./likes/client";

function Details() {
    const [currentUser, setCurrentUser] = useState(null);
    const [book, setBook] = useState(null);
    //const [tracks, setTracks] = useState([]);
    const { bookId } = useParams();
    //const [likes, setLikes] = useState([]);

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

   /* const fetchLikes = async () => {
        const likes = await likesClient.findUsersThatLikeBook(bookId);
        setLikes(likes);
    };

    const currenUserLikesBook = async () => {
        const _likes = await likesClient.createUserLikesBook(
            currentUser._id,
            bookId
        );
        setLikes([_likes, ...likes]);
    }; */

    useEffect(() => {
        fetchBook();
        //fetchTracks();
        fetchUser();
        //fetchLikes();
    }, []);

    return (
        <div>
            {book && (
                <div>
                    {currentUser && (
                        <button
                            className="btn btn-warning float-end"
                        >
                            Like
                        </button>
                    )}
                    <h1>{book.title}</h1>
                    <img
                        src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                        alt={book.title}
                    />


                </div>
            )}
        </div>
    );
}

export default Details;