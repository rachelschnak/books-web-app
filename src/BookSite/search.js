import React, { useState, useEffect } from "react";
import { API_KEY } from "./client";
import * as client from "./client";
import { Link, useParams, useNavigate } from "react-router-dom";

function Search() {
    const { search } = useParams();
    const [searchTerm, setSearchTerm] = useState( search);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchBooks = async (search) => {
        try {
            //search = search.split(' ').join('+')
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
            <ul className="list-group">
                {results &&
                 results.map((book, index) => (
                     <li key={index} className="list-group-item">
                         <Link to={`/BookSite/details/${(book.key).replace("/works/","")}`}>
                             <h3>{book.title}</h3>
                             {book.author_name}
                             <img
                                 src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                 alt={``}
                             />
                         </Link>
                     </li>
                 ))}
            </ul>
        </div>
    );
}

export default Search;