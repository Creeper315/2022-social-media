import { createSlice } from "@reduxjs/toolkit";

export const notification = createSlice({
    name: "notification",
    initialState: {
        msgNotification: [],
        friendNotification: [],
    },
    reducers: {
        rdxSetMsgNoti: (state, action) => {
            let allNotification = action.payload;
            state.msgNotification = allNotification;
        },
        rdxSetFriendNoti: (state, action) => {
            let allNotification = action.payload;
            state.friendNotification = allNotification;
        },
    },
});

export const { rdxSetMsgNoti, rdxSetFriendNoti } = notification.actions;
export default notification.reducer;
