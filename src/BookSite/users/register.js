import React, { useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import * as client from "./client";
function Register() {
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

        <div className={"col wd-kanbas-user-content d-block"}>
            <h1>Register</h1>
            {error && <div>{error}</div>}
            <input className={"form-control"}
                value={credentials.username} placeholder={"username"}
                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    username: e.target.value })} />
            <input className={"form-control"}
                value={credentials.password} placeholder={"password"}
                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    password: e.target.value })} />
            <input className={"form-control"}  placeholder={"first name"}
                   onChange={(e) =>setCredentials({
                                                      ...credentials,
                                                   firstName: e.target.value })}/>
            <input className={"form-control"}   placeholder={"last name"}
                   onChange={(e) => setCredentials({
                                                       ...credentials,
                                                   lastName: e.target.value })}/>
            <input className={"form-control"}  placeholder={"Date of Birth"}
                   onChange={(e) => setCredentials({
                                                       ...credentials,
                                                   dob: e.target.value })}/>
            <input className={"form-control"}  placeholder={"email"}
                   onChange={(e) => setCredentials({
                                                       ...credentials,
                                                   email: e.target.value })}/>
            <select className={"form-control"}
                    onChange={(e) => setCredentials({...credentials,
                                                        role: e.target.value })}>
                <option value="USER">User</option>
                <option value="AUTHOR">Author</option>
                <option value="PUBLISHER">Publisher</option>
                <option value="ADMIN">Admin</option>
            </select>



            <button onClick={signup}>
                Signup
            </button>
        </div>
        </div>
    ); }
export default Register;