import * as client from "./client";
import { useEffect, useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const signIn = async () => {
        try {
            const credentials = { username: username, password: password };
            const user = await client.signin(credentials);
            navigate("/BookSite/account");
        } catch (error) {
            setError(error);
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
        <div className={"col-3 wd-kanbas-user-content d-block"}>
            <h2>Sign In</h2>
            {error && <div className="alert alert-danger">{error.message}</div>}
            <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn} className="btn btn-primary">
                Sign In
            </button>
        </div>
        </div>
    );
}

export default SignIn;