import * as client from "./client";
import { useEffect, useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const signIn = async () => {
        try {
            const credentials = {username: username, password: password};
            const user = await client.signin(credentials);
            if (user) {
                navigate(`/BookSite/profile/${user._id}`);
            }
        } catch (error) {
            setError(error);
        }
    };

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
        <div className={"row wd-kanbas-user-content"}>

            <div className="list-group wd-kanbas-user-navigation col-auto d-none d-lg-block">
                {account && (
                    <>
                        <Link to={`/BookSite/Profile/${account._id}`} className="list-group-item books-profile-link">
                            Profile
                        </Link>
                    </>
                )}

                <Link to={`/BookSite/Signin`} className="list-group-item books-profile-link-active">
                    Signin
                </Link>

                <Link to={`/BookSite/Register`} className="list-group-item books-profile-link">
                    Register
                </Link>

                {account && account.role === "ADMIN" && (
                    <>
                        <Link to="/BookSite/admin/users" className="list-group-item books-users-link">
                            Users
                        </Link>
                    </>)}
            </div>

        <div className={"book-user-fields book-signin-block"}>
            <div className={'book-signin-title'}>Sign In</div>
            {error && <div className="alert alert-danger">{error.message}</div>}
            <input
                type="text"
                className="book-user-fields form-control "
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                className="book-user-fields form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn} className="btn btn-success btn-sign">
                submit
            </button>
        </div>
        </div>
    );
}

export default SignIn;