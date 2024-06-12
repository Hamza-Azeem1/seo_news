import { ADD_LINK, APPROVE_LINK, DELETE_LINK } from '../Actions/linkActions';

const initialState = {
    links: []
};

const linkReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LINK:
            return {
                ...state,
                links: [...state.links, action.payload]
            };
        case APPROVE_LINK:
            return {
                ...state,
                links: state.links.map((link, index) => {
                    if (index === action.payload) {
                        return { ...link, approved: true };
                    }
                    return link;
                })
            };
        case DELETE_LINK:
            return {
                ...state,
                links: state.links.filter((link, index) => index !== action.payload)
            };
        default:
            return state;
    }
};

export default linkReducer;