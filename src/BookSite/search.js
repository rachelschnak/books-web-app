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

<div className={'row searchbarbutton'}>
            <input
                type="text"
                className="col-8 form-control-55"
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
            /><button
            onClick={() => navigate(`/BookSite/search/${searchTerm}`)}
            className="btn btn-primary review-edit-btn float-end col-1">
            Search
            </button>
</div>

            <div className={'searchResultsHeader'}>Search Results</div>


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
                                 <div className={"bookInfo col"}>
                             <div className={'bookTitle row-lg-10'}>{book.volumeInfo.title}</div>
                             <div className={'bookAuth row'}><Link to={`/BookSite/author/${(book.volumeInfo.authors)}`}>{book.volumeInfo.authors}</Link></div>
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