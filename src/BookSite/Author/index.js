import * as client from "../client";
import * as usersClient  from "../users/client"
import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import * as likesClient from "../likes/client";
import {findBookById} from "../client";
import "./index.css"


function Author() {
    const {author} = useParams()
    const [thisAuthor, setAuthor] = useState(author)
    const [booksByAuthor, setBooksByAuthor] = useState()
    const [currentUser, setCurrentUser] = useState(null);
    const [likedBooks, setLikedBooks] = useState([]);
    const [likedBooksByAuthor, setLikedBooksByAuthor] = useState([]);
    const count = useRef(null);

    const fetchUser = async () => {
        try {
            const user = await usersClient.account();
            setCurrentUser(user);
            if (user) {
                fetchBooksUserLikes(user._id);
            }
        } catch (error) {

        }
    };

    const fetchAuthor = async () => {
        try {
            const books = await client.findBooksByAuthor(author);
            setBooksByAuthor(books);
        } catch (error) {
            console.log("didnt fetch ")
        }
    };

    const fetchBooksUserLikes = async (userId) => {
        try {
            const likes = await likesClient.findBooksThatUserLikes(userId);
            for(const each in likes) {
                const bookId = likes[each].bookId;
                fetchBooks(bookId);
            }
        } catch (error) {

        }
    };

    const fetchBooks = async (bookId) => {
        try {
            const book = await findBookById(bookId)
            setLikedBooks(likedBooks => [...likedBooks, book])
            if (book.volumeInfo.authors[0] === author) {
                setLikedBooksByAuthor(likedBooksByAuthor => [...likedBooksByAuthor, book])
            }
        } catch (error) {
            console.log("didn't fetch any liked books")
        }
    };



    const slideLeft2 =  () => {
        const slider = document.getElementById('slider2')
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight2 = () => {
        const slider = document.getElementById('slider2')
        slider.scrollLeft = slider.scrollLeft + 500
    }

    useEffect(() => {
        if(count.current == null) {
            fetchUser();
            fetchAuthor();

            return () => {count.current = 1;}
        }

        }, [])



    return(
        <div >
            {currentUser && currentUser.role === "AUTHOR" &&  author.includes(currentUser.firstName) && author.includes(currentUser.lastName) && (
                <>
                <h1>Hi Author, this is your page</h1>
                </>

            )}

            <div className={'authorpage-authorName'}>{author}</div>

                {currentUser && (<>
                    <div className={'likedBooksByAuth'}>
                    <h3>Books you like by author</h3>
                        <div  className={'liked-book-slider'}>
                            <div className={'tw-relative tw-items-center tw-flex book-h-list'}>
                            <MdChevronLeft onClick={slideLeft2} size={100} className={'tw-opacity-50 tw-cursor-pointer hover:tw-opacity-100 book-scroll '} />
                                <div id={"slider2"} className={'tw-w-auto tw-h-full tw-overflow-scroll tw-scroll tw-whitespace-nowrap tw-scroll-smooth tw-scrollbar-hide'}>
                                    {likedBooksByAuthor &&
                                    likedBooksByAuthor.map((book, index) => (

                                     <Link to={`/BookSite/book/${(book.id)}`}>
                                         <img className={'tw-inline-block tw-cursor-pointer hover:tw-scale-105 tw-ease-in-out tw-duration-300 book-h-list-item'}
                                              src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                                              alt={``}
                                         />
                                     </Link>

                                    ))}

                                </div>
                            <MdChevronRight size={100} onClick={slideRight2} className={'tw-opacity-50 tw-cursor-pointer hover:tw-opacity-100 '} />
                            </div>
                        </div>
                    </div>
                </>)}

            <div className={'fullBookList'}>
            <div className={'allBooksHeader'}><h3>All books</h3></div>
            <div>
            <ul className="list-group books-search-list tw-h-[70%] ">
                {booksByAuthor &&
                 booksByAuthor.map((book, index) => (
                     <li key={index} className="list-group-item">
                         <Link to={`/BookSite/book/${(book.id)}`}>
                             <div className={"row"}>
                                 <div className={"col-auto"}>
                                     <img
                                         src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                                         alt={``}
                                     />
                                 </div>
                                 <div className={"col"}>
                                     <h3>{book.volumeInfo.title}</h3>
                                 </div>
                             </div>
                         </Link>
                     </li>
                 ))}

            </ul>
            </div>
            </div>
        </div>
    )
}
export default Author;