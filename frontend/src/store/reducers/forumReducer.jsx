const initialState = {
    questions: [],
    question: null,
    answers: [],
    loading: false,
    error: null,
};

const forumReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_QUESTIONS_SUCCESS':
            return {
                ...state,
                questions: action.payload,
                loading: false,
                error: null,
            };
        case 'GET_QUESTIONS_FAILURE':
            return {
                ...state,
                loading: false,
                error: 'Error fetching questions',
            };
        case 'CREATE_QUESTION_SUCCESS':
            return {
                ...state,
                questions: [...state.questions, action.payload],
                loading: false,
                error: null,
            };
        case 'CREATE_QUESTION_FAILURE':
            return {
                ...state,
                loading: false,
                error: 'Error creating question',
            };
        case 'GET_QUESTION_SUCCESS':
            return {
                ...state,
                question: action.payload,
                answers: action.payload.answers || [],
                loading: false,
                error: null,
            };
        case 'GET_QUESTION_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case 'CREATE_ANSWER_SUCCESS':
            return {
                ...state,
                question: action.payload,
                loading: false,
                error: null,
            };
        case 'CREATE_ANSWER_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'LIKE_QUESTION_SUCCESS':
            return {
                ...state,
                question: action.payload,
                loading: false,
                error: null,
            };
        case 'LIKE_QUESTION_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'LIKE_ANSWER_SUCCESS':
            return {
                ...state,
                question: action.payload,
                loading: false,
                error: null,
            };
        case 'LIKE_ANSWER_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'EDIT_QUESTION_SUCCESS':
            return {
                ...state,
                questions: state.questions.map(q => q._id === action.payload._id ? action.payload : q),
                loading: false,
                error: null,
            };
        case 'EDIT_QUESTION_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'DELETE_QUESTION_SUCCESS':
            return {
                ...state,
                questions: state.questions.filter(q => q._id !== action.payload),
                loading: false,
                error: null,
            };
        case 'DELETE_QUESTION_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'EDIT_ANSWER_SUCCESS':
            return {
                ...state,
                questions: state.questions.map(q => q._id === action.payload._id ? action.payload : q),
                loading: false,
                error: null,
            };
        case 'EDIT_ANSWER_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'DELETE_ANSWER_SUCCESS':
            return {
                ...state,
                questions: state.questions.map(q => q._id === action.payload._id ? action.payload : q),
                loading: false,
                error: null,
            };
        case 'DELETE_ANSWER_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default forumReducer;