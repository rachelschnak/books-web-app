import axios from "axios";
//const COURSES_URL = "http://localhost:4000/api/courses";
//const ASSIGNMENTS_URL = "http://localhost:4000/api/assignments";
//const COURSES_URL = "https://kanbas-node-server-app-5dsi.onrender.com/api/courses";
//const ASSIGNMENTS_URL = 'https://kanbas-node-server-app-5dsi.onrender.com/api/assignments';
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_URL = `${API_BASE}/courses`;
const ASSIGNMENTS_URL = `${API_BASE}/assignments`;


export const updateAssignment = async (assignment) => {
    try {
        const response = await axios
            .put(`${ASSIGNMENTS_URL}/${assignment._id}`, assignment);
        return response.data;
    } catch(error) {
        if (error.response) {
            console.log(error.response)
        }
    }
};

export const deleteAssignment = async (assignmentId) => {
    const response = await axios
        .delete(`${ASSIGNMENTS_URL}/${assignmentId}`);
    return response.data;
};

export const createAssignment = async (courseId, assignment) => {
    const response = await axios.post(
        `${COURSES_URL}/${courseId}/assignments`,
        assignment
    );
    return response.data;
};

export const findAssignmentsForCourse = async (courseId) => {
    const response = await axios
        .get(`${COURSES_URL}/${courseId}/assignments`);
    return response.data;
};