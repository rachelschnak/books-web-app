import axios from "axios";
export const OPENLIB_API = "https://openlibrary.org";
export const GOOGLEBBOOKS_API = "https://www.googleapis.com/books/v1/volumes";

export const NYTBOOKS_KEY = 'xaJwBmmDuBXHEAn6ALWrAnhLCoHq4MzT';//process.env.NYTBOOKS_KEY;

export const NYTBOOKS_API = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYTBOOKS_KEY}`;

export const NYTBOOKSREVIEWS_API = `https://api.nytimes.com/svc/books/v3/reviews.json?`;

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
    const convertResponse = [];
    //just get top 10
        for ( let each = 0; each < 10; each++) {
            const book = await findFirstBookByTitle(response.data.results.books[each].title)
            const boook = await findBookById(book.id)
            convertResponse[each] = boook;
        }
    //return response.data.results.books;
    return convertResponse;
}

export const findFirstBookByTitle = async(bookTitle) => {
    const response = await axios.get(
        `${GOOGLEBBOOKS_API}?q=${bookTitle}`
    )
    return response.data.items[0];
};


export const findNYTBookReviews = async(bookTitle) => {
    const response = await axios.get(
        `${NYTBOOKSREVIEWS_API}title=${bookTitle}&api-key=${NYTBOOKS_KEY}`
    );
    return response.data;
}




