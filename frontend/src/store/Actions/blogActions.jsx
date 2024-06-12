import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL, // Update this line
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

export const addBlog = (formData) => async (dispatch) => {
    try {
        const response = await api.post('/api/blog', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: 'ADD_BLOG_SUCCESS',
            payload: response.data,
        });
        return response; // Ensure the response is returned
    } catch (error) {
        console.error('Error adding blog:', error);
        dispatch({
            type: 'ADD_BLOG_FAILURE',
        });
        throw error;
    }
};

export const updateBlog = (id, formData) => async (dispatch) => {
    try {
        const response = await api.put(`/api/blog/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: 'UPDATE_BLOG_SUCCESS',
            payload: response.data,
        });
        return response; // Ensure the response is returned
    } catch (error) {
        console.error('Error updating blog:', error);
        dispatch({
            type: 'UPDATE_BLOG_FAILURE',
        });
        throw error;
    }
};

export const deleteBlog = (id) => async (dispatch) => {
    try {
        const response = await api.delete(`/api/blog/${id}`);
        dispatch({
            type: 'DELETE_BLOG_SUCCESS',
            payload: id,
        });
        return response; // Ensure the response is returned
    } catch (error) {
        console.error('Error deleting blog:', error);
        dispatch({
            type: 'DELETE_BLOG_FAILURE',
        });
        throw error;
    }
};