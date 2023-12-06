import axios from "axios";
export const OPENLIB_API = "https://openlibrary.org";

export const findBooks = async (searchTerm) => {
    const response = await axios.get(
        `${OPENLIB_API}/search.json?title=${searchTerm}`
    )
    return response.data.docs;
};

export const findBookById = async (bookId) => {
    const response = await axios.get(
        `${OPENLIB_API}/works/${bookId}.json`
    );
    return response.data;
};

/*export const findTracksByAlbumId = async (albumId) => {
    const response = await axios.get(
        `${NAPSTER_API}/albums/${albumId}/tracks?apikey=${API_KEY}`
    );
    return response.data.tracks;
};*/