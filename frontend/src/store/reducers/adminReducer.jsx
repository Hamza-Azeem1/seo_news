const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem('token'),
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': {
            const { access_token } = action.payload.data;
            localStorage.setItem('token', access_token);
            return {
                ...state,
                token: access_token,
                isAuthenticated: true
            };
        }
        case 'LOGOUT_SUCCESS': {
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            };
        }
        default:
            return state;
    }
};

export default adminReducer;
