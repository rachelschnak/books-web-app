import * as client from "./client";
import * as bookClient from "../client";
import React, { useState, useEffect } from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css"
import {CgProfile} from "react-icons/cg";
import * as likesClient from "../likes/client";
import {findBookById} from "../client";

function Account() {
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const [likes, setLikes] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);
    const fetchAccount = async () => {
        try {
            const account = await client.account();
            setAccount(account);
            if (!account) {
               navigate("/BookSite/signin")
            } else {
            fetchBooksUserLikes(account._id) }
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

    useEffect(() => {
            fetchAccount();
    }, []);

    const links = ["Account", "Signin", "Register"];
    const { pathname } = useLocation();


    return (
        <div className={"row"}>
            <div className="list-group wd-kanbas-user-navigation col-auto d-none d-lg-block">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={`/BookSite/${link}`}
                        className={`list-group-item ${pathname.includes(link) && "active"}`}>
                        {link}
                    </Link>
                ))}
            </div>

        <div className=" col-3 w-50 wd-kanbas-user-content d-block">


            {account && (

                <div>
                    <h1>{account.username}'s Profile
                        <button className={"btn btn-warning float-end"} onClick={signout}>
                            Signout
                        </button>
                        <button className={"btn btn-primary float-end"} onClick={() => navigate(`/BookSite/account/${account._id}`)}>
                        Edit Account
                    </button>

                    </h1>

                    <h5>Username: {account.username}</h5>
                    <h5>Email: {account.email}</h5>
                    <h5>Role: {account.role}</h5>
                    <h3>Liked Books</h3>
                    <ul className="list-group">
                        {likedBooks &&
                         likedBooks.map((book, index) => (
                             <li key={index} className="list-group-item">
                                 <Link to={`/BookSite/book/${(book.id)}`}>
                                     <h3>{book.volumeInfo.title}</h3>
                                     {book.volumeInfo.authors}
                                     <img
                                         src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                                         alt={``}
                                     />
                                 </Link>
                             </li>
                         ))}
                    </ul>

                    <h3>Book Lists</h3>
                    <h3> friends </h3>

                    {account.role === "ADMIN" && (
                    <Link to="/BookSite/admin/users" className="btn btn-warning w-100">
                        Users
                    </Link>
                               )}
                </div>
            )} </div></div>
    ); }
export default Account;