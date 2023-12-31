import React, { useState, useEffect } from "react";
import * as client from "./client";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import {Link, useLocation} from "react-router-dom";


function UserTable() {
    const [users, setUsers] = useState([]);
    const [account, setAccount] = useState(null);
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
<div className={''}>
    <div className="list-group wd-kanbas-user-navigation col-auto d-none d-lg-block">

            {account && (
                <>
                    <Link to={`/BookSite/Profile/${account._id}`} className="list-group-item books-profile-link">
                        Profile
                    </Link>
                </>
            )}

            <Link to={`/BookSite/Signin`} className="list-group-item books-profile-link">
                Signin
            </Link>

            <Link to={`/BookSite/Register`} className="list-group-item books-profile-link">
                Register
            </Link>

            {account && account.role === "ADMIN" && (
                <>
                    <Link to="/BookSite/admin/users" className="list-group-item books-users-link-active">
                        Users
                    </Link>
                </>)}

    </div>
        <div className={"user-list-all"}>
            <div className={'book-user-list-header'}>User List</div>
            <div className={'book-users-table-all'}>
            <table className="book-users-table table table-striped table-hover table-sm">
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
                                          className="text-primary fs-1 text tw-cursor-pointer hover:tw-scale-105 tw-ease-in-out " />
                        <BsFillCheckCircleFill onClick={updateUser}
                                               className="text-success fs-1 text tw-cursor-pointer hover:tw-scale-105 tw-ease-in-out " />
                    </td>
                </tr>
                </thead>
                <tbody className={''}>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td><Link to={`/BookSite/account/${user._id}`}>
                        {user.username}
                        </Link></td>
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
</div>
    ); }
export default UserTable;