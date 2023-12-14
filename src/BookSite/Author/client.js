import axios from "axios";

const request = axios.create({withCredentials: true,});

export const BASE_API = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
export const AUTHOR_API = `${BASE_API}/author`;

export const BOOKS_API = `${BASE_API}/book`;

export const createAuthorComment = async (userId, bookId, comment) => {
    const response = await request.post(`${AUTHOR_API}/${userId}/comment/${bookId}/${comment}`);
    return response.data;
};

export const deleteAuthorComment = async (userId, bookId) => {
    const response = await request.delete(`${BASE_API}/comment/${bookId}`);
    return response.data;
};

export const findAuthorComment = async (bookId) => {
    const response = await request.get(`${BOOKS_API}/${bookId}/comment`);
    return response.data;
};

export const updateAuthorComment = async (userId, bookId, comment) => {
    const response = await request.put(`${AUTHOR_API}/${userId}/comment/${bookId}/${comment}`);
    return response.data;
};