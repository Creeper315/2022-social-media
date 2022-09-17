import { BsThreeDots, BsSearch } from "react-icons/bs";
import { RiVideoAddFill, RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";

import nobody from "../../../img/nobody.jpeg";
import ChatBox, { initialLoadAmount, additionLoadAmount } from "./chatBox";
// import GroupBox from "./groupBox";
import AddGroupBox from "./addGroupBox";

import axios from "axios";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { useState, useRef, useContext, useEffect } from "react";
import { SocketContext } from "../../../Socket/socketContext";
import { useSelector, useDispatch } from "react-redux";
import {
    rdxDeleteFriend,
    rdxAddFriend,
    rdxAddGroup,
    rdxLeaveGroup,
    rdxIncMsgNoti,
} from "../../../redux/slice/thisUser";
import { rdxOpenChat } from "../../../redux/slice/openChat";
// import { rdxOpenChat } from "../../../redux/slice/openChat";

const Contact = () => {
    const { Socket } = useContext(SocketContext);
    // const msgLoadAmount = 2; // 往上 scroll，每次 load 进来多少
    const disp = useDispatch();
    const this_user = useSelector((s) => s.user);
    const open_chat = useSelector((s) => s.chat);

    const preventBoxOpen = useRef(false);
    const chatType = useRef(""); // one of: group / individual
    const [BoxOpen, setBoxOpen] = useState(false);
    const [AddGroupOpen, setAddGroupOpen] = useState(false);
    const [AllChatMessage, setAllChatMessage] = useState([]);
    const [ModalOpen, setModalOpen] = useState(false);
    const modelText = useRef("");
    const yesFun = useRef();
    const noFun = useRef();

    const childRef = useRef();

    useEffect(() => {
        // console.log("restart contact main effect");
        Socket.on("delete friend", (_id) => {
            disp(rdxDeleteFriend(_id));
        });
        Socket.on("add friend", (friend) => {
            disp(rdxAddFriend(friend));
        });
        Socket.on("create group", (chatId, name) => {
            // 更新 一行group
            // console.log("on create g", chatId, name);
            disp(rdxAddGroup({ chatId, name }));
        });

        Socket.on("receieve msg", (senderObj) => {
            // 日期 + 对方的 msg，画出来
            // console.log("red 1", senderObj.chatId);
            // console.log("red 2", ChatInfo.chatId, ChatInfo);

            if (senderObj.chatId === open_chat.chatId) {
                // console.log("rec msg !", senderObj);
                setAllChatMessage((arr) => [...arr, senderObj]);
            } else {
                // console.log("rec msg To Noti-", senderObj);

                // save to msg notification
                // 只需要 notification count +1，就行。因为 user 点开 notification 按钮，会重新从 server 里面加载所有 list notification
                disp(rdxIncMsgNoti());

                // const msgObj / senderObj = {
                //     chatId: ChatInfo.chatId,
                //     text: Msg.current,
                //     senderId: this_user._id,
                //     pro: this_user.pro,
                //     time: "2022-09-01",
                //     name: this_user.name,
                //     chatName:
                // };

                axios.post("/addNotification", {
                    type: "msg",
                    _id: this_user._id,
                    obj: senderObj,
                });
            }
        });

        return () => {
            Socket.off("delete friend");
            Socket.off("add friend");
            Socket.off("create group");
            Socket.off("receieve msg");
        };
    }, [open_chat, this_user]); // 注意！这里必须加进来 ChatInfo，因为，useEffect 里面，

    useEffect(() => {
        // open_chat --> { type, chatId, name, pro, _id }
        if (open_chat.isOpen === false) return;
        openChatBox(open_chat);
    }, [open_chat]);

    function drawBkColor(chatId) {
        if (open_chat.isOpen && chatId == open_chat.chatId) {
            return " active";
        } else {
            return "";
        }
    }

    function drawListFriend() {
        let listFriend = this_user.friend || [];

        return listFriend.map((e, idx) => {
            return (
                <div
                    className={"one-person" + drawBkColor(e.chatId)}
                    key={idx}
                    onClick={() => {
                        // chatType.current = "individual";
                        // openChatBox(e);
                        if (open_chat.isOpen && open_chat.chatId == e.chatId)
                            return;
                        if (preventBoxOpen.current) return;

                        let obj = {
                            type: "individual",
                            chatName: e.name,
                            ...e,
                        };
                        // console.log("click friend obj: ", obj);
                        disp(rdxOpenChat(obj));
                    }}
                >
                    <img src={nobody} alt="profile" />
                    <div className="contact-name">{e.name}</div>
                    <div
                        className="icon"
                        onClick={() => clickDelete(e)}
                        onMouseEnter={() => (preventBoxOpen.current = true)}
                        onMouseLeave={() => (preventBoxOpen.current = false)}
                    >
                        <RiDeleteBin5Line className="ri" />
                    </div>
                </div>
            );
        });
    }

    function drawListGroup() {
        let listGroup = this_user.group;
        // console.log("l g", listGroup);
        return listGroup.map((e, idx) => {
            return (
                <div
                    className={"one-person" + drawBkColor(e.chatId)}
                    key={idx}
                    onClick={() => {
                        // chatType.current = "group";
                        // openChatBox(e);
                        if (open_chat.isOpen && open_chat.chatId == e.chatId)
                            return;
                        if (preventBoxOpen.current) return;

                        let obj = { type: "group", chatName: e.name, ...e };
                        disp(rdxOpenChat(obj));
                    }}
                >
                    <img src={nobody} alt="profile" />
                    <div className="contact-name">{e.name}</div>
                    <div
                        className="icon"
                        onClick={() => clickLeave(e.chatId)}
                        onMouseEnter={() => (preventBoxOpen.current = true)}
                        onMouseLeave={() => (preventBoxOpen.current = false)}
                    >
                        <IoExitOutline className="ri" />
                    </div>
                </div>
            );
        });
    }

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

    function leaveGroup(chatId) {
        // chatId table 里面，删除这个 userId，user 里面，删除这个 group。
        // 如果 chat table 里面，没有 user 了，删除这个 chat Table
        //
        if (!window.confirm("Sure to quit group chat?")) {
            console.log("dont quit");
            return;
        }
        axios
            .get("/leaveGroup", { params: { _id: this_user._id, chatId } })
            .then(({ data: chatId }) => {
                // 在本地更新 this_user 的 redux，
                disp(rdxLeaveGroup(chatId));
            });
    }

    function getChatHistory(chatId, msgLoadAmount) {
        if (msgLoadAmount == undefined) msgLoadAmount = initialLoadAmount;

        return axios.post("/getChatHistory", {
            chatId,
            curNumMsg: AllChatMessage.length,
            msgLoadAmount: msgLoadAmount,
        });
    }

    function openChatBox(chatWith) {
        if (preventBoxOpen.current) return;
        setBoxOpen(true);

        getChatHistory(chatWith.chatId).then(({ data }) => {
            // console.log("fetch chat his", data);
            setAllChatMessage(data);
            if (data.length < initialLoadAmount) {
                childRef.current.canLoadMoreMessage(false);
            } else {
                childRef.current.canLoadMoreMessage(true);
            }
            // childRef.current && childRef.current.scrollToBottom();
        });
    }

    function drawModal() {
        return (
            <Modal isOpen={ModalOpen}>
                <ModalHeader toggle={() => setModalOpen(false)}></ModalHeader>
                <ModalBody>{modelText.current}</ModalBody>
                <ModalFooter>
                    <Button onClick={noFun.current}>No</Button>
                    <Button onClick={yesFun.current}>Yes</Button>
                </ModalFooter>
            </Modal>
        );
    }

    function clickDelete(e) {
        setModalOpen(true);
        modelText.current = "Delete This Friend from List?";
        yesFun.current = () => {
            deleteFriend(e);
            setModalOpen(false);
        };
        noFun.current = () => setModalOpen(false);
    }
    function clickLeave(chatId) {
        setModalOpen(true);
        modelText.current = "Leave this Group ?";
        yesFun.current = () => {
            leaveGroup(chatId);
            setModalOpen(false);
        };
        noFun.current = () => setModalOpen(false);
    }

    return (
        <div id="body-right-contact">
            {drawModal()}
            {AddGroupOpen ? <AddGroupBox {...{ setAddGroupOpen }} /> : null}
            {BoxOpen ? (
                <ChatBox
                    {...{
                        chatType,
                        setBoxOpen,
                        getChatHistory,
                        // ChatInfo,
                        // clearChatInfo,
                        AllChatMessage,
                        setAllChatMessage,
                    }}
                    ref={childRef}
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
                {/* <div className="one-person">
                    <img src={nobody} alt="profile" />
                    <div className="contact-name">Name Here!</div>
                    <div className="icon">
                        <RiDeleteBin5Line className="ri" />
                    </div>
                </div> */}
                {drawListFriend()}
            </div>
            <div className="title">Group Conversations</div>
            <div className="list-contact">
                {/* <div className="one-person" onClick={() => setBoxOpen(true)}>
                    <img src={nobody} alt="profile" />
                    <div className="contact-name">Name Here!</div>
                    <div className="icon">
                        <IoExitOutline className="ri" />
                    </div>
                </div> */}
                {drawListGroup()}
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
