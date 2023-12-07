import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import store from "./store";
import { Provider } from "react-redux";
import Register from "./users/register";
import UserTable from "./users/table";
import Account from "./users/account.js"
import UserList from "./users/list";
import UserDetails from "./users/details";
import Search from "./search";
import BookNavigation from "./BookNavigation";
import Home from "./Home";
import Book from "./book";
import AccountEdit from "./users/accountEdit";
import Signin from "./users/signin";


function BookSite() {

    return (
        <Provider store={store}>
        <div className="d-flex">
            <BookNavigation />
            <div className="container-fluid wd-booksite-main">
                <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Inbox" element={<h1>Inbox</h1>} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/admin/users" element={<UserTable />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:id" element={<UserDetails />} />
                    <Route path="/profile" element={<Account />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/account/:id" element={<AccountEdit />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/search/:search" element={<Search />} />
                    <Route path="/book/:bookId" element={<Book />}/>
                </Routes>
            </div>
        </div>
        </Provider>
            ); }
export default BookSite;

