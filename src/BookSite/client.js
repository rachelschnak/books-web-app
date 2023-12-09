import axios from "axios";
export const OPENLIB_API = "https://openlibrary.org";
export const GOOGLEBBOOKS_API = "https://www.googleapis.com/books/v1/volumes";

export const NYTBOOKS_KEY = 'xaJwBmmDuBXHEAn6ALWrAnhLCoHq4MzT';//process.env.NYTBOOKS_KEY;

export const NYTBOOKS_API = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYTBOOKS_KEY}`;

export const findBooks = async (searchTerm) => {
    const response = await axios.get(
        //`${OPENLIB_API}/search.json?title=${searchTerm}`
        `${GOOGLEBBOOKS_API}?q=${searchTerm}`
    )
    return response.data.items;
};

export const findBookById = async (bookId) => {
    const response = await axios.get(
        `${GOOGLEBBOOKS_API}/${bookId}`
    );
    return response.data;
};

export const findBooksByAuthor = async (author) => {
    const response = await axios.get(
        `${GOOGLEBBOOKS_API}?q=inauthor:"${author}"&maxResults=40`
    );
    return response.data.items;
};

export const findNYTBestsellers = async() => {
    const response = await axios.get(
        `${NYTBOOKS_API}`
    )
    return response.data.results.books;
}

export const findFirstBookByTitle = async(bookTitle) => {
    const response = await axios.get(
        `${GOOGLEBBOOKS_API}?q=${bookTitle}`
    )
    return response.data.items[0];
};


