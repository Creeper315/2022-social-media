import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './slice/thisUser';

// const allReducer = combineReducers({
//     userSlice,
// });

export default configureStore({
    reducer: {
        user: userSlice,
    },
});
