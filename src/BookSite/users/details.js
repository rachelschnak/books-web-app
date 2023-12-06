import React from "react";
import {useParams, useNavigate, Link, useLocation} from "react-router-dom";
import * as client from "./client";
import { useEffect, useState } from "react";
function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const fetchUser = async () => {
        const user = await client.findUserById(id);
        setUser(user);
    };
    const updateUser = async () => {
        const status = await client.updateUser(id, user);
    };
    const deleteUser = async (id) => {
        const status = await client.deleteUser(id);
        navigate("/BookSite/users");
    };
    useEffect(() => {
        fetchUser();
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
        <div className={"col wd-kanbas-user-content d-block"}>

            <h2>User Details</h2>

            {user && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>
                        First Name:
                        <input
                            type="text"
                            className="form-control"
                            value={user.firstName}
                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                        />
                    </p>
                    <p>Last Name: {user.lastName}</p>
                    <button onClick={updateUser} className="btn btn-primary">
                        Update
                    </button>
                    <button
                        onClick={() => deleteUser(user._id)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
        </div>
    );
}

export default UserDetails;