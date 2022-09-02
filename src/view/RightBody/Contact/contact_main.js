import { BsThreeDots, BsSearch } from "react-icons/bs";
import { RiVideoAddFill, RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";

import nobody from "../../../img/nobody.jpeg";
import ChatBox from "./chatBox";
import AddGroupBox from "./addGroupBox";

import axios from "axios";

import { useState, useRef, useContext, useEffect } from "react";
import { SocketContext } from "../../../Socket/socketContext";
import { useSelector, useDispatch } from "react-redux";
import { rdxDeleteFriend, rdxAddFriend } from "../../../redux/slice/thisUser";

const Contact = () => {
    const { Socket } = useContext(SocketContext);
    const msgLoadAmount = 2; // 往上 scroll，每次 load 进来多少
    const disp = useDispatch();
    const this_user = useSelector((s) => s.user);

    const hoverDelete = useRef(false);
    const [BoxOpen, setBoxOpen] = useState(false);
    const [AddGroupOpen, setAddGroupOpen] = useState(true);
    const [AllChatMessage, setAllChatMessage] = useState([]);
    const [Friend, setFriend] = useState({
        _id: "",
        pro: "",
        name: "",
        chatId: "",
    });

    useEffect(() => {
        Socket.on("delete friend", (_id) => {
            console.log("delete f", _id);

            disp(rdxDeleteFriend(_id));
        });
        Socket.on("add friend", (friend) => {
            disp(rdxAddFriend(friend));
        });
        Socket.on("create group", (chatId, name) => {
            // 更新 一行group
            // emit 给 server 我要加入 group 的 room
        });

        return () => {
            Socket.off("delete friend");
            Socket.off("add friend");
        };
    }, []);

    function deleteFriend(friend) {
        // 双方的 friend 里面删除，并且删除 id 为 chatId 的 chat
        axios
            .post("/deleteFriend", {
                user1: this_user._id,
                user2: friend._id,
                chatId: friend.chatId,
            })
            .then((e) => {
                // socket 通知另一个 user 现场 update friend list。
                // 需要一个 update friend list 的 function 吧
                // 可能这个 function 就是 reload user？ 或者单纯把这个 user one-person-line 取消掉
                // console.log('delete res', e.data);
                disp(rdxDeleteFriend(friend._id));
                Socket.emit("delete friend", friend._id, this_user._id); // 因为这个是给另一个 user 看的 id，所以是自己的 id
            })
            .catch((e) => {});
    }

    function drawListFriend() {
        // console.log('ll1', this_user);

        let listFriend = this_user.friend || [];

        return listFriend.map((e, idx) => {
            return (
                <div
                    className="one-person"
                    key={idx}
                    onClick={() => openFriendChat(e)}
                >
                    <img src={nobody} alt="profile" />
                    <div className="contact-name">{e.name}</div>
                    <div
                        className="icon"
                        onClick={() => deleteFriend(e)}
                        onMouseEnter={() => (hoverDelete.current = true)}
                        onMouseLeave={() => (hoverDelete.current = false)}
                    >
                        <RiDeleteBin5Line className="ri" />
                    </div>
                </div>
            );
        });
    }

    function getChatHistory(chatId) {
        console.log("len", AllChatMessage.length);
        return axios.post("/getChatHistory", {
            chatId,
            curNumMsg: AllChatMessage.length,
            msgLoadAmount: msgLoadAmount,
        });
    }

    function openFriendChat(friend) {
        // 拿到聊天数据，并且记录页数？
        console.log("open chat", friend);
        if (hoverDelete.current) return;
        getChatHistory(friend.chatId).then((e) => {
            console.log("fetch chat his", e.data);
            setAllChatMessage(e.data);
        });
        setBoxOpen(true);

        let { _id, pro, name, chatId } = friend;
        setFriend({
            _id,
            pro,
            name,
            chatId,
        });
    }

    function drawListGroup() {
        let listGroup = this_user.group || [];
        console.log("l g", listGroup);

        return listGroup.map((e, idx) => {
            <div className="one-person" key={idx}>
                <img src={nobody} alt="profile" />
                <div>One Group</div>
            </div>;
        });
    }

    return (
        <div id="body-right-contact">
            {AddGroupOpen ? <AddGroupBox {...{ setAddGroupOpen }} /> : null}
            {BoxOpen ? (
                <ChatBox
                    {...{
                        setBoxOpen,
                        getChatHistory,
                        Friend,
                        AllChatMessage,
                        setAllChatMessage,
                        msgLoadAmount,
                    }}
                />
            ) : null}

            <div className="first-line">
                <p>Contacts</p>
                <div>
                    <RiVideoAddFill className="ri" />
                </div>
                <div>
                    <BsSearch className="ri" />
                </div>
                <div>
                    <BsThreeDots className="ri" />
                </div>
            </div>
            <div className="list-contact">
                <div className="one-person">
                    <img src={nobody} alt="profile" />
                    <div className="contact-name">Name Here!</div>
                    <div className="icon">
                        <RiDeleteBin5Line className="ri" />
                    </div>
                </div>
                {drawListFriend()}
            </div>
            <div className="title">Group Conversations</div>
            <div className="list-contact">
                <div className="one-person" onClick={() => setBoxOpen(true)}>
                    <img src={nobody} alt="profile" />
                    <div className="contact-name">Name Here!</div>
                    <div className="icon">
                        <IoExitOutline className="ri" />
                    </div>
                </div>
                {drawListGroup([])}
                <div
                    className="one-person create-group"
                    onClick={() => {
                        setAddGroupOpen(true);
                    }}
                >
                    <div>
                        <AiOutlinePlus className="ri" />
                    </div>
                    <div>Create a Group</div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
