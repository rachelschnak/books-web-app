import axios from "axios";

//const API_BASE = "http://localhost:4000/api";
export const API_BASE = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
const USERS_API = `${API_BASE}/users`;
const LIKES_API = `${API_BASE}/likes`;

export const findAllLikes = async () => {};
export const createUserLikesBook = async (userId, bookId) => {
    const response = await axios.post(`${USERS_API}/${userId}/likes/${bookId}`);
    return response.data;
};
export const deleteUserLikesBook = async (userId, bookId) => {};
export const findUsersThatLikeBook = async (bookId) => {
    const response = await axios.get(`${LIKES_API}/${bookId}/users`);
    return response.data;
};
export const findBooksThatUserLikes = async (userId) => {
    const response = await axios.get(`${USERS_API}/${userId}/likes`);
    return response.data;
};