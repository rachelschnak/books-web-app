import React, { useState, useEffect } from "react";
import * as client from "./client";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import {Link, useLocation} from "react-router-dom";
function UserTable() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: "", password: "", role: "USER" });
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => { fetchUsers(); }, []);

    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };

    const selectUser = async (user) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };

    const updateUser = async () => {
        try {
            const status = await client.updateUser(user._id, user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };

    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user._id);
            setUsers(users.filter((u) => u._id !== user._id ));
        } catch (err) {
            console.log(err);
        }
    };

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
            <h1>User List</h1>
            <table className="table">
                <thead> <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
                <tr>
                    <td>
                        <input value={user.username} placeholder="username" onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                        <input value={user.password} placeholder="password" onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                    </td>
                    <td>
                        <input value={user.firstName} placeholder="first name" onChange={(e) => setUser({ ...user, firstName: e.target.value })}/>
                    </td>
                    <td>
                        <input value={user.lastName} placeholder="last name" onChange={(e) => setUser({ ...user, lastName: e.target.value })}/>
                    </td>
                    <td>
                        <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                            <option value="USER">User</option>
                            <option value="AUTHOR">Author</option>
                            <option value="PUBLISHER">Publisher</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </td>
                    <td className="text-nowrap">
                        <BsPlusCircleFill onClick={createUser}
                                          className="text-primary fs-1 text" />
                        <BsFillCheckCircleFill onClick={updateUser}
                                               className="text-success fs-1 text" />
                    </td>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <Link to={`/BookSite/account/${user._id}`}>
                        <td>{user.username}</td>
                        </Link>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td className="text-nowrap">
                        <button className="btn btn-warning me-2">
                            <BsPencil onClick={() => selectUser(user)} />
                        </button>
                            <button className="btn btn-danger me-2">
                                <BsTrash3Fill onClick={() => deleteUser(user)} />
                            </button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
</div>
    ); }
export default UserTable;