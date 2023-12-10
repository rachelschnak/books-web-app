import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import * as client from "./client";
function Register() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
                                                       username: "", password: "" });
    const navigate = useNavigate();
    const [account, setAccount] = useState(null);
    const signup = async () => {
        try {
            await client.signup(credentials);
            navigate("/BookSite/account");
        } catch (err) {
            setError(err.response.data.message);
        } };

    const links = ["Account", "Signin", "Register"];
    const { pathname } = useLocation();

    const fetchAccount = async () => {
        try {
            const account = await client.account();
            setAccount(account);

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchAccount();
    },[])

    return (
        <div className={"row"}>
        <div className="list-group wd-kanbas-user-navigation col-auto d-none d-lg-block">
            {account && (
                <>
                    <Link to={`/BookSite/Profile/${account._id}`} className="list-group-item books-profile-link">
                        Profile
                    </Link>
                </>
            )}
            {links.map((link, index) => (
                <Link
                    key={index}
                    to={`/BookSite/${link}`}
                    className={`list-group-item ${pathname.includes(link) && "active"}`}>
                    {link}
                </Link>
            ))}
            {account && account.role === "ADMIN" && (
                <>
                    <Link to="/BookSite/admin/users" className="list-group-item books-users-link ">
                        Users
                    </Link>
                </>)}
        </div>

        <div className={"col book-user-fields book-signin-block"}>
            <div className={'book-signin-title'}>Register</div>
            {error && <div>{error}</div>}
            <input className={"form-control"}
                value={credentials.username} placeholder={"username"}
                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    username: e.target.value })} />
            <input className={"book-user-fields form-control"}
                value={credentials.password} placeholder={"password"}
                onChange={(e) => setCredentials({
                                                    ...credentials,
                                                    password: e.target.value })} />
            <input className={"book-user-fields form-control"}  placeholder={"first name"}
                   onChange={(e) =>setCredentials({
                                                      ...credentials,
                                                   firstName: e.target.value })}/>
            <input className={"book-user-fields form-control"}   placeholder={"last name"}
                   onChange={(e) => setCredentials({
                                                       ...credentials,
                                                   lastName: e.target.value })}/>
            <input className={"book-user-fields form-control"}  placeholder={"Date of Birth"}
                   onChange={(e) => setCredentials({
                                                       ...credentials,
                                                   dob: e.target.value })}/>
            <input className={"book-user-fields form-control"}  placeholder={"email"}
                   onChange={(e) => setCredentials({
                                                       ...credentials,
                                                   email: e.target.value })}/>
            <select className={"book-user-fields form-control"}
                    onChange={(e) => setCredentials({...credentials,
                                                        role: e.target.value })}>
                <option value="USER">User</option>
                <option value="AUTHOR">Author</option>
                <option value="PUBLISHER">Publisher</option>
                <option value="ADMIN">Admin</option>
            </select>



            <button className={'btn btn-success'} onClick={signup}>
                signup
            </button>
        </div>
        </div>
    ); }
export default Register;