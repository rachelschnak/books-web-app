import axios from "axios";

const request = axios.create({withCredentials: true,});


export const API_BASE = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
const USERS_API = `${API_BASE}/users`;


export const userFollowsUser = async (followed) => {
        const response = await request.post(`${USERS_API}/${followed}/follows`);
        return response.data;
};
export const userUnfollowsUser = async (followed) => {
    const response = await request.delete(`${USERS_API}/${followed}/follows`);
    return response.data;
};

export const findFollowersOfUser = async (followed) => {
    const response = await request.get(`${USERS_API}/${followed}/followers`);
    return response.data;
};
export const findFollowedUsersByUser = async (follower) => {
    const response = await request.get(`${USERS_API}/${follower}/following`);
    return response.data;
};