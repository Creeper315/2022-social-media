import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "thisUser",
    initialState: {
        _id: "",
        email: "",
        name: "",
        pro: "",
        friend: [],
        group: [],
        feed: [],
        msgNotificationCount: 0,
        friendNotificationCount: 0,
    },
    reducers: {
        initUser: (state, action) => {
            let {
                _id,
                email,
                name,
                pro,
                friend,
                group,
                feed,
                msgNotificationCount,
                friendNotificationCount,
            } = action.payload;

            if (_id != undefined) state._id = _id;
            if (email != undefined) state.email = email;
            if (name != undefined) state.name = name;
            if (pro != undefined) state.pro = pro;
            if (feed != undefined) state.feed = feed;
            if (friend != undefined) state.friend = friend;
            if (group != undefined) state.group = group;
            if (msgNotificationCount != undefined)
                state.msgNotificationCount = msgNotificationCount;
            if (friendNotificationCount != undefined)
                state.friendNotificationCount = friendNotificationCount;
        },
        rdxAddFriend: (state, action) => {
            let { _id, name, pro, chatId } = action.payload;
            state.friend.push({ _id, name, pro, chatId });
        },
        rdxDeleteFriend: (state, action) => {
            let _id = action.payload;
            state.friend = state.friend.filter((e) => e._id !== _id);
        },
        rdxAddGroup: (state, action) => {
            let { chatId, name } = action.payload;
            state.group.push({ chatId, name });
        },
        rdxLeaveGroup: (state, action) => {
            let chatId = action.payload;
            state.group = state.group.filter((e) => e.chatId != chatId);
        },
        rdxIncMsgNoti: (state) => {
            state.msgNotificationCount++;
        },
        rdxIncFriendNoti: (state) => {
            state.friendNotificationCount++;
        },
        rdxDecMsgNoti: (state) => {
            state.msgNotificationCount--;
        },
        rdxDecFriendNoti: (state) => {
            state.friendNotificationCount--;
        },
    },
});

export const {
    initUser,
    rdxAddFriend,
    rdxDeleteFriend,
    rdxAddGroup,
    rdxLeaveGroup,
    rdxIncMsgNoti,
    rdxIncFriendNoti,
    rdxDecMsgNoti,
    rdxDecFriendNoti,
} = userSlice.actions;
export default userSlice.reducer;
