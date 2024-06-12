const initialState = {
    token: null,
    isAuthenticated: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, token: action.payload.data.access_token, isAuthenticated: true, error: null };
        case 'LOGIN_FAILURE':
            return { ...state, token: null, isAuthenticated: false, error: action.payload };
        case 'REGISTER_SUCCESS':
            return { ...state, error: null };
        case 'REGISTER_FAILURE':
            return { ...state, error: action.payload };
        case 'LOGOUT':
            return { ...state, token: null, isAuthenticated: false, error: null };
        default:
            return state;
    }
};

export default authReducer;