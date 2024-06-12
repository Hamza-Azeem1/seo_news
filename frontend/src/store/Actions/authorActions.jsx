import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL,
});

export const fetchAuthors = () => async (dispatch) => {
    try {
        const response = await api.get('/api/authors');
        dispatch({ type: 'FETCH_AUTHORS_SUCCESS', payload: response.data });
    } catch (error) {
        console.error(error);
        dispatch({ type: 'FETCH_AUTHORS_FAILURE' });
    }
};

export const createAuthor = (author) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('name', author.name);
        formData.append('designation', author.designation);
        formData.append('profilePicture', author.profilePicture);

        const response = await api.post('/api/authors', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        dispatch({ type: 'CREATE_AUTHOR_SUCCESS', payload: response.data });
        dispatch(fetchAuthors()); // Fetch the updated list of authors
    } catch (error) {
        console.error(error);
        dispatch({ type: 'CREATE_AUTHOR_FAILURE' });
    }
};

export const updateAuthor = (id, author) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('name', author.name);
        formData.append('designation', author.designation);
        formData.append('profilePicture', author.profilePicture);

        const response = await api.put(`/api/authors/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        dispatch({ type: 'UPDATE_AUTHOR_SUCCESS', payload: response.data });
        dispatch(fetchAuthors()); // Fetch the updated list of authors
    } catch (error) {
        console.error(error);
        dispatch({ type: 'UPDATE_AUTHOR_FAILURE' });
    }
};

export const deleteAuthor = (id) => async (dispatch) => {
    try {
        await api.delete(`/api/authors/${id}`);
        dispatch({ type: 'DELETE_AUTHOR_SUCCESS', payload: id });
        dispatch(fetchAuthors()); // Fetch the updated list of authors
    } catch (error) {
        console.error(error);
        dispatch({ type: 'DELETE_AUTHOR_FAILURE' });
    }
};
