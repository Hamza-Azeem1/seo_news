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

export const adminLogin = ({ email, password }) => async (dispatch) => {
    const username = import.meta.env.VITE_REACT_APP_USERNAME
    const pass = import.meta.env.VITE_REACT_APP_PASSWORD
    if (email === username && password === pass) {
        localStorage.setItem('token', 'dummy_token');

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
                data: {
                    access_token: 'dummy_token'
                }
            },
        });

        return { success: true };
    } else {
        throw new Error('Invalid credentials');
    }
};


export const adminLogOut = () => async (dispatch) => {
    dispatch({
        type: 'LOGOUT_SUCCESS'
    });
};
