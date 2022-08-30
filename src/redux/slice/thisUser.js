import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'thisUser',
    initialState: {
        _id: '',
        email: '',
        name: '',
        pro: '',
    },
    reducers: {
        setUser: (state, action) => {
            let { _id, email, name, pro, friend } = action.payload;
            if (_id != undefined) state._id = _id;
            if (email != undefined) state.email = email;
            if (name != undefined) state.name = name;
            if (pro != undefined) state.pro = pro;
            state.friend = friend;
        },
        addFriend: (state, action) => {},
        deleteFriendById: (state, action) => {
            let { _id } = action._id;
            state.friend = state.friend.filter((e) => e !== _id);
        },
    },
});

export const { setUser, deleteFriendById } = userSlice.actions;
export default userSlice.reducer;
