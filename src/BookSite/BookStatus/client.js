import axios from "axios";

const request = axios.create({withCredentials: true,});

export const API_BASE = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
const USERS_API = `${API_BASE}/users`;
const BOOKSTATUS_API = `${API_BASE}/bookStatus`;

export const createUserBookStatus = async (userId, bookId, bookStatus) => {
    const response = await request.post(`${USERS_API}/${userId}/bookStatus/${bookId}`, bookStatus);
    return response.data;
};
export const deleteUserBookStatus = async (userId, bookId) => {
    const response = await request.delete(`${USERS_API}/${userId}/bookStatus/${bookId}`);
    return response.data;
};

export const findUsersWithBookStatus = async (bookId) => {
    const response = await request.get(`${BOOKSTATUS_API}/${bookId}/users`);
    return response.data;
};
export const findBookStatusesOfUser = async (userId) => {
    const response = await request.get(`${USERS_API}/${userId}/bookStatus`);
    return response.data;
};

export const getBookStatusOfUser = async (userId, bookId) => {
    const response = await request.get(`${USERS_API}/${userId}/bookStatus/${bookId}`);
    return response.data;
};

export const updateBookStatus = async (userId, bookId, bookStatus) => {
    const response = await request.put(`${USERS_API}/${userId}/bookStatus/${bookId}`, bookStatus);
    return response.data;
};