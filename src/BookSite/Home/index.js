import {React, useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import "./index.css";
import * as client from "../users/client";
import * as likesClient from "../likes/client";
import * as bookClient from "../client";
import {findBookById, findFirstBookByTitle} from "../client";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
function Home() {

    const [account, setAccount] = useState(null);
    //const [best, setBest] = useState(null);
    const [topBooks, setTopBooks] = useState([]);
    const navigate = useNavigate();
    const [likes, setLikes] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);
    const count = useRef(null);

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
            //for(const each in bestNYT) {
            //    const bookTitle = bestNYT[each].title;
            //    await fetchBookByTitle(bookTitle);
            //}
            for(const each in bestNYT) {
                if (each < 10) {
                    const bookTitle = bestNYT[each].title;
                    await fetchBookByTitle(bookTitle);
                }
            }
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
            fetchAccount();
            fetchNYTBest();
            return () => {count.current = 1;}
        }
        console.log("inside useEffect")
    }, []);


    return (
        <div className="wd-project-home-dashboard">
            <div className={'home-header'}>Trending</div>

            <div className="card-deck wd-kanbas-dashboard-grid">
                <div className="book-deck row row-cols-3 row-cols-sm-5 row-cols-lg-5 row-cols-xxl-5" >
                    {topBooks &&
                     topBooks.map((book, index) => (

                         <Link to={`/BookSite/book/${(book.id)}`}>
                             {<img className={'tw-cursor-pointer hover:tw-scale-105 tw-ease-in-out tw-duration-300 book-h-list-item card-img-top'}
                                   src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                                   alt={``}
                             />}
                         </Link>
                     ))}
                </div>
            </div>

            <hr/>
            {account && (
                <>
            <div className={'home-header'}>Your Liked Books </div>

                    <div  className={'liked-book-slider'}>
                    <div className={'tw-relative tw-items-center tw-flex book-h-list'}>
                        <MdChevronLeft onClick={slideLeft2} size={100} className={'tw-opacity-50 tw-cursor-pointer hover:tw-opacity-100 book-scroll '} />
                        <div id={"slider2"} className={'tw-w-auto tw-h-full tw-overflow-scroll tw-scroll tw-whitespace-nowrap tw-scroll-smooth tw-scrollbar-hide'}>
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
                        <MdChevronRight size={100} onClick={slideRight2} className={'tw-opacity-50 tw-cursor-pointer hover:tw-opacity-100 '} />
                    </div>
                    </div>
                    </>
                )}

        </div>
    ); }
export default Home;