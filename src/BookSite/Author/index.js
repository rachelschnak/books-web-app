import * as client from "../client";
import * as usersClient  from "../users/client"
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";


function Author() {
    const {author} = useParams()
    const [thisAuthor, setAuthor] = useState(author)
    const [booksByAuthor, setBooksByAuthor] = useState()
    const [currentUser, setCurrentUser] = useState(null);

    const fetchUser = async () => {
        const user = await usersClient.account();
        setCurrentUser(user);
        console.log(currentUser)
    };

    const fetchAuthor = async () => {
        try {
            const books = await client.findBooksByAuthor(author);
            setBooksByAuthor(books);
        } catch (error) {
            console.log("didnt fetch ")
        }
    };

    useEffect(() => {
                fetchUser();
                  fetchAuthor();
              }, [])



    return(
        <div >
            {currentUser && currentUser.role === "AUTHOR" &&  author.includes(currentUser.firstName) && author.includes(currentUser.lastName) && (
                <>
                <h1>Hi Author, this is your page</h1>
                </>

            )}

            <h2>Books By {author}</h2>
            <div className={"tw-scroll"}>
            <ul className="list-group books-search-list tw-h-[70%] tw-overflow-y-scroll">
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
    )
}
export default Author;