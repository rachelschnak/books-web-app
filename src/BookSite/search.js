import React, { useState, useEffect } from "react";

import * as client from "./client";
import { Link, useParams, useNavigate } from "react-router-dom";

function Search() {
    const { search } = useParams();
    const [searchTerm, setSearchTerm] = useState(search);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchBooks = async (search) => {
        try {
            const results = await client.findBooks(searchTerm)
            setResults(results);
            setSearchTerm(search);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    };

    useEffect(() => {
        if (search) {
            setLoading(true);
            fetchBooks(search).then(() => setLoading(false))
        }
    }, [search]);


    if(loading) {
        return <h1>Loading...</h1>
    }

    if(error){
        return <pre>{JSON.stringify(error,null,2)}</pre>
    }

    return (
        <div>
            <h1>Search</h1>
            <button
                onClick={() => navigate(`/BookSite/search/${searchTerm}`)}
                className="btn btn-primary float-end"
            >
                Search
            </button>
            <input
                type="text"
                className="form-control w-75"
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
            />

            <h2>Results</h2>


            <ul className="list-group books-search-list">
                {results &&
                 results.map((book, index) => (
                     <li key={index} className="list-group-item">
                         <Link to={`/BookSite/book/${(book.id)}`}>
                             <div className={"row"}>
                                 <div className={"col-auto"}>
                             <img
                                 src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                                 alt={``}
                             />
                                 </div>
                                 <div className={"col"}>
                             <h3>{book.volumeInfo.title}</h3>
                             {book.volumeInfo.authors}
                                 </div>
                             </div>

                         </Link>
                     </li>
                 ))}
            </ul>
        </div>
    );
}

export default Search;