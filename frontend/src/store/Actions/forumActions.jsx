import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL,
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

export const getQuestions = () => async (dispatch) => {
    try {
        const response = await api.get('/api/forum');
        dispatch({ type: 'GET_QUESTIONS_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error fetching questions:', error);
        dispatch({ type: 'GET_QUESTIONS_FAILURE' });
    }
};

export const createQuestion = (formData) => async (dispatch) => {
    try {
        const response = await api.post('/api/forum', formData);
        dispatch({ type: 'CREATE_QUESTION_SUCCESS', payload: response.data });
        return response; // Ensure the response is returned
    } catch (error) {
        console.error('Error creating question:', error);
        dispatch({ type: 'CREATE_QUESTION_FAILURE' });
        throw error;
    }
};

export const getQuestionById = (id) => async (dispatch) => {
    dispatch({ type: 'GET_QUESTION_REQUEST' });
    try {
        const response = await api.get(`/api/forum/${id}`);
        dispatch({ type: 'GET_QUESTION_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error fetching question:', error);
        dispatch({ type: 'GET_QUESTION_FAILURE', payload: error.message });
    }
};


export const createAnswer = (id, content) => async (dispatch) => {
    try {
        const response = await api.post(`/api/forum/${id}/answer`, { content });
        dispatch({ type: 'CREATE_ANSWER_SUCCESS', payload: response.data });
        return response; // Ensure the response is returned
    } catch (error) {
        console.error('Error creating answer:', error);
        dispatch({ type: 'CREATE_ANSWER_FAILURE', payload: error.message });
        throw error;
    }
};

export const likeQuestion = (id) => async (dispatch) => {
    try {
        const response = await api.post(`/api/forum/${id}/like`);
        dispatch({ type: 'LIKE_QUESTION_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error liking question:', error);
        dispatch({ type: 'LIKE_QUESTION_FAILURE', payload: error.message });
    }
};

export const likeAnswer = (questionId, answerId) => async (dispatch) => {
    try {
        const response = await api.post(`/api/forum/${questionId}/answer/${answerId}/like`);
        dispatch({ type: 'LIKE_ANSWER_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error liking answer:', error);
        dispatch({ type: 'LIKE_ANSWER_FAILURE', payload: error.message });
    }
};

export const editQuestion = (id, data) => async (dispatch) => {
    try {
        const response = await api.put(`/api/forum/${id}`, data);
        dispatch({ type: 'EDIT_QUESTION_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error editing question:', error);
        dispatch({ type: 'EDIT_QUESTION_FAILURE', payload: error.message });
    }
};

export const deleteQuestion = (id) => async (dispatch) => {
    try {
        await api.delete(`/api/forum/${id}`);
        dispatch({ type: 'DELETE_QUESTION_SUCCESS', payload: id });
    } catch (error) {
        console.error('Error deleting question:', error);
        dispatch({ type: 'DELETE_QUESTION_FAILURE', payload: error.message });
    }
};

export const editAnswer = (questionId, answerId, data) => async (dispatch) => {
    try {
        const response = await api.put(`/api/forum/${questionId}/answer/${answerId}`, data);
        dispatch({ type: 'EDIT_ANSWER_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error editing answer:', error);
        dispatch({ type: 'EDIT_ANSWER_FAILURE', payload: error.message });
    }
};

export const deleteAnswer = (questionId, answerId) => async (dispatch) => {
    try {
        const response = await api.delete(`/api/forum/${questionId}/answer/${answerId}`);
        dispatch({ type: 'DELETE_ANSWER_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error deleting answer:', error);
        dispatch({ type: 'DELETE_ANSWER_FAILURE', payload: error.message });
    }
};
