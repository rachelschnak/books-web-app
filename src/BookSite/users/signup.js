import React, { useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import * as client from "./client";
function Signup() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
                                                       username: "", password: "" });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(credentials);
            navigate("/BookSite/account");
        } catch (err) {
            setError(err.response.data.message);
        } };

    const links = ["Account", "Signin", "Signup", "Search"];
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

        <div className={"col wd-kanbas-user-content d-block"}>
            <h1>Signup</h1>
            {error && <div>{error}</div>}
            <input
                value={credentials.username} placeholder={"username"}
                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    username: e.target.value })} />
            <input
                value={credentials.password} placeholder={"password"}
                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    password: e.target.value })} />
            <button onClick={signup}>
                Signup
            </button>
        </div>
        </div>
    ); }
export default Signup;