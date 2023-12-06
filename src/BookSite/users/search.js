import * as client from "./client";
import { useEffect, useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
function Search() {

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
                <h2>Search</h2>
            </div>

        </div>
    );
}

export default Search;