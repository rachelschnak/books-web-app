import {React, useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
//import db from "../Database";
import "./index.css";
import * as client from "../users/client";
import * as likesClient from "../likes/client";
import * as bookClient from "../client";
import {findBookById, findFirstBookByTitle} from "../client";
function Home() {

    const [account, setAccount] = useState(null);
    //const [best, setBest] = useState(null);
    const [topBooks, setTopBooks] = useState([]);
    const navigate = useNavigate();
    const [likes, setLikes] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);
    const fetchAccount = async () => {
        try {
            const account = await client.account();
            setAccount(account);
            if(account) {
                await fetchBooksUserLikes(account._id)
            }

        } catch (error) {
            console.log(error)
        }
    };

    const fetchNYTBest = async () => {
        try {
            const bestNYT = await bookClient.findNYTBestsellers();
            //setBest(bestNYT);
            for(const each in bestNYT) {
                const bookTitle = bestNYT[each].title;
                //console.log(bestNYT[each].title);
                await fetchBookByTitle(bookTitle);
            }
            console.log("topbooks")
            console.log(topBooks)
        } catch (error) {
            //setBest(null);
            console.log("Error in fetchNYTBest")
        }
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

    const fetchBookByTitle = async (bookTitle) => {
        try {
            const tBook = await findFirstBookByTitle(bookTitle)
            setTopBooks(topBooks => [...topBooks, tBook])

        } catch (error) {
            console.log("didn't fetch top books")
        }
    };

    useEffect(() => {
        fetchAccount();
        fetchNYTBest();
        console.log("inside useEffect")
    }, []);

    return (
        <div className="wd-project-home-dashboard">
            <h1>Home</h1>
            <hr/>
            <h2>Trending</h2>
            <div className="card-deck wd-kanbas-dashboard-grid">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4" >
                    {topBooks &&
                     topBooks.map((book, index) => (

                         <Link to={`/BookSite/book/${(book.id)}`}
                               className="list-group-item" className="card">
                             {<img className={"card-image-top"}
                                   src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                                   alt={``}
                             />}
                         </Link>
                     ))}
                </div>
            </div>


            <hr/>
            <h2>Your Liked Books ({likedBooks.length})</h2>
            <div className="card-deck wd-kanbas-dashboard-grid">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4" >
                    {likedBooks &&
                     likedBooks.map((book, index) => (

                             <Link to={`/BookSite/book/${(book.id)}`}
                                   className="list-group-item" className="card">
                                 {<img className={"card-image-top"}
                                       src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                                       alt={``}
                                 />}
                             </Link>
                     ))}
            </div>
            </div>
        </div>
    ); }
export default Home;