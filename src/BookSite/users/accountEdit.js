import * as client from "./client";
import { useState, useEffect } from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css"
import {CgProfile} from "react-icons/cg";

function AccountEdit() {
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const fetchAccount = async () => {
        //try {
        const account = await client.account();
        setAccount(account);
        //} catch (error) {
        //    navigate("/kanbas/signin")
        //}
        if (account == null) {
            navigate("/BookSite/signin")
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

    useEffect(() => {
        if (id) {
            findUserById(id);
        } else {
            fetchAccount();
        }
    }, []);

    const links = ["Account", "Signin", "Signup"];
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
                <h1>Account</h1>

                {account && (
                    <div>
                        <div>
                            <label htmlFor="formFileLg" className="form-label">Large file input
                                example</label>
                            <input className="form-control form-control-lg" id="formFileLg" type="file" />
                        </div>
                        <input className={"form-control"} value={account.username} placeholder="username"
                               onChange={(e) => setAccount({ ...account,
                                                               username: e.target.value })}/>
                        <input className={"form-control"} value={account.password} placeholder="password"
                               onChange={(e) => setAccount({ ...account,
                                                               password: e.target.value })}/>
                        <input className={"form-control"}  value={account.firstName} placeholder={"first name"}
                               onChange={(e) => setAccount({ ...account,
                                                               firstName: e.target.value })}/>
                        <input className={"form-control"}  value={account.lastName} placeholder={"last name"}
                               onChange={(e) => setAccount({ ...account,
                                                               lastName: e.target.value })}/>
                        <input className={"form-control"}  value={account.dob} placeholder={"Date of Birth"}
                               onChange={(e) => setAccount({ ...account,
                                                               dob: e.target.value })}/>
                        <input className={"form-control"}  value={account.email} placeholder={"email"}
                               onChange={(e) => setAccount({ ...account,
                                                               email: e.target.value })}/>
                        <select className={"form-control"}  value={account.role} onChange={(e) => setAccount({ ...account,
                                                                                                                 role: e.target.value })}>
                            <option value="USER">User</option>
                            <option value="ADMIN">Author</option>
                            <option value="FACULTY">Publisher</option>
                            <option value="STUDENT">Admin</option>
                        </select>

                        <button className={"btn btn-success"} onClick={save}>
                            Save
                        </button>
                        <button className={"btn btn-warning"} onClick={signout}>
                            Signout
                        </button>
                        {account.role === "ADMIN" && (
                            <Link to="/BookSite/admin/users" className="btn btn-warning w-100">
                                Users
                            </Link>
                        )}
                    </div>
                )} </div></div>
    ); }
export default AccountEdit;