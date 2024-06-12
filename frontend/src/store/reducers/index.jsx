import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from './adminReducer';
import forumReducer from "./forumReducer";
import authorReducer from "./authorReducer"
import linkReducer from "./linkReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    admin: adminReducer,
    forum: forumReducer,
    authors: authorReducer,
    links: linkReducer,
    auth: authReducer,
})

export default rootReducer