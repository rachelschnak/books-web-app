import * as client from "./client";
import { useEffect, useState } from "react";
import {Link, Navigate, useLocation} from "react-router-dom";
function UserList() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); // [1
    const fetchUser = async () => {
        const user = await client.account();
        setCurrentUser(user);
    };
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => {
        fetchUsers();
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
            {currentUser && currentUser.role === "ADMIN" && (
                <>
                    <h2>Users</h2>
                    <div className="list-group">
                        {users.map((user) => (
                            <Link
                                key={user._id}
                                to={`/BookSite/users/${user._id}`}
                                className="list-group-item"
                            >
                                {user.username}
                            </Link>
                        ))}
                    </div>
                </>
            )}
            {currentUser && currentUser.role !== "ADMIN" && (
                <Navigate to="/BookSite/signin" />
            )}
        </div>
</div>
    );
}

export default UserList;