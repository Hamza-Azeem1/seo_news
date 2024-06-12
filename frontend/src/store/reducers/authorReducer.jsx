const initialState = {
    authors: [],
    loading: false,
    error: null,
};

const authorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_AUTHORS_SUCCESS':
            return { ...state, authors: action.payload, loading: false, error: null };
        case 'FETCH_AUTHORS_FAILURE':
            return { ...state, loading: false, error: 'Failed to fetch authors' };
        case 'CREATE_AUTHOR_SUCCESS':
            return { ...state, authors: [...state.authors, action.payload], loading: false, error: null };
        case 'CREATE_AUTHOR_FAILURE':
            return { ...state, loading: false, error: 'Failed to create author' };
        case 'UPDATE_AUTHOR_SUCCESS':
            return {
                ...state,
                authors: state.authors.map((author) =>
                    author._id === action.payload._id ? action.payload : author
                ),
                loading: false,
                error: null,
            };
        case 'UPDATE_AUTHOR_FAILURE':
            return { ...state, loading: false, error: 'Failed to update author' };
        case 'DELETE_AUTHOR_SUCCESS':
            return {
                ...state,
                authors: state.authors.filter((author) => author._id !== action.payload),
                loading: false,
                error: null,
            };
        case 'DELETE_AUTHOR_FAILURE':
            return { ...state, loading: false, error: 'Failed to delete author' };
        default:
            return state;
    }
};

export default authorReducer;
