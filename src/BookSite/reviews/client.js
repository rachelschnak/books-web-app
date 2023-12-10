import axios from "axios";

const request = axios.create({withCredentials: true,});

export const API_BASE = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
const USERS_API = `${API_BASE}/users`;
const REVIEWS_API = `${API_BASE}/reviews`;

/*
export const createUserReviewsBook = async (userId, bookId, review) => {
    const response = await axios.post(`${USERS_API}/${userId}/reviews/${bookId}`, review);
    return response.data;
}; */

export const createUserReviewsBook = async (userId, bookId, review) => {
    const response = await request.post(`${USERS_API}/${userId}/reviews/${bookId}/${review}`);
    return response.data;
};

export const deleteUserReviewsBook = async (userId, bookId) => {
    const response = await request.delete(`${USERS_API}/${userId}/reviews/${bookId}`);
    return response.data;
};

export const findReviewsByUser = async (userId) => {
    const response = await request.get(`${USERS_API}/${userId}/reviews`);
    return response.data;
};

export const findBookReviews = async (bookId) => {
    const response = await request.get(`${REVIEWS_API}/${bookId}`);
    return response.data;
};

export const updateReview = async (bookId, userId, review) => {
    const response = await request.put(`${USERS_API}/${userId}/reviews/${bookId}/${review}`);
    return response.data;
};