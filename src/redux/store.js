import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slice/thisUser";
import chatSlice from "./slice/openChat";

// const allReducer = combineReducers({
//     userSlice,
// });

export default configureStore({
    reducer: {
        user: userSlice,
        chat: chatSlice,
    },
});
