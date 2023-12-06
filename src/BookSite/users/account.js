import * as client from "./client";
import { useState, useEffect } from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css"

function Account() {
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

        <div className=" col-3 w-50 wd-kanbas-user-content d-block">
            <h1>Account</h1>
            {account && (
                <div>
                    <input value={account.password} placeholder="password"
                           onChange={(e) => setAccount({ ...account,
                                                           password: e.target.value })}/>
                    <input value={account.firstName} placeholder={"first name"}
                           onChange={(e) => setAccount({ ...account,
                                                           firstName: e.target.value })}/>
                    <input value={account.lastName} placeholder={"last name"}
                           onChange={(e) => setAccount({ ...account,
                                                           lastName: e.target.value })}/>
                    <input value={account.dob} placeholder={"Date of Birth"}
                           onChange={(e) => setAccount({ ...account,
                                                           dob: e.target.value })}/>
                    <input value={account.email} placeholder={"email"}
                           onChange={(e) => setAccount({ ...account,
                                                           email: e.target.value })}/>
                    <select value={account.role} onChange={(e) => setAccount({ ...account,
                                                            role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>

                    <button onClick={save}>
                        Save
                    </button>
                    <button onClick={signout}>
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
export default Account;