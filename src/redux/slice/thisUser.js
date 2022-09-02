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
    },
    reducers: {
        initUser: (state, action) => {
            let { _id, email, name, pro, friend, group } = action.payload;
            if (_id != undefined) state._id = _id;
            if (email != undefined) state.email = email;
            if (name != undefined) state.name = name;
            if (pro != undefined) state.pro = pro;
            state.group = group;
            state.friend = friend;
        },
        rdxAddFriend: (state, action) => {
            let { _id, name, pro, chatId } = action.payload;
            state.friend.push({ _id, name, pro, chatId });
        },
        rdxDeleteFriend: (state, action) => {
            let _id = action.payload;
            // console.log("?", _id);
            state.friend = state.friend.filter((e) => e._id !== _id);
        },
        rdxAddGroup: (state, action) => {
            let { chatId, name } = action.payload;
            console.log("rdx", chatId, name);
            state.group.push({ chatId, name });
        },
    },
});

export const { initUser, rdxAddFriend, rdxDeleteFriend, rdxAddGroup } =
    userSlice.actions;
export default userSlice.reducer;
