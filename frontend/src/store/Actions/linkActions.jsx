import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API,
});

const getToken = () => {
    return localStorage.getItem('token');
};

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const ADD_LINK = 'ADD_LINK';
export const APPROVE_LINK = 'APPROVE_LINK';
export const DELETE_LINK = 'DELETE_LINK';


export const addLink = (title, link) => ({
    type: ADD_LINK,
    payload: { title, link, approved: false }
});

export const approveLink = (index) => ({
    type: APPROVE_LINK,
    payload: index
});

export const deleteLink = (index) => ({
    type: DELETE_LINK,
    payload: index
});