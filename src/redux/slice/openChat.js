import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chatSlice",
    initialState: {
        // type 是 'group'或者'individual', _id 是一起聊天的 friend user id. 如果是 'group', pro 是 undefined
        type: "",
        chatId: "",
        name: "",
        chatName: "",
        pro: "",
        _id: "",
        isOpen: false,
    },
    reducers: {
        rdxOpenChat: (state, action) => {
            let { type, chatId, name, chatName, pro, _id } = action.payload;
            state.type = type || "";
            state.chatId = chatId || "";
            state.name = name || "";
            state.chatName = chatName || "";
            state.pro = pro || "";
            state._id = _id || "";
            state.isOpen = true;
        },
        rdxCloseChat: (state) => {
            state.isOpen = false;
        },
    },
});

export const { rdxOpenChat, rdxCloseChat } = chatSlice.actions;
export default chatSlice.reducer;
