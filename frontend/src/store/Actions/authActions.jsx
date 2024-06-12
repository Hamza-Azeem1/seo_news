import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_API}/api/auth`,
});

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await api.post('/login', { email, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { data: { access_token: token } } }); // Update payload structure
    } catch (error) {
        console.error('Error during login:', error);
        let errorMessage = 'An error occurred during login.';
        if (error.response && error.response.status === 400) {
            errorMessage = 'Invalid email or password. Please try again.';
        }
        dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
    }
};

export const register = (username, email, password) => async (dispatch) => {
    try {
        await api.post('/register', { username, email, password }); // Include username in the request body
        dispatch({ type: 'REGISTER_SUCCESS' });
    } catch (error) {
        console.error('Error during registration:', error);
        if (error.response) {
            // // The request was made and the server responded with a status code
            // console.error('Server responded with status code:', error.response.status);
            console.error('Error message:', error.response.data.message);
            dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data.message });
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            dispatch({ type: 'REGISTER_FAILURE', payload: 'No response received from server' });
        } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error setting up request:', error.message);
            dispatch({ type: 'REGISTER_FAILURE', payload: 'Error setting up request' });
        }
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
};
