import nobody from "../../img/nobody.jpeg";
import { BsThreeDots, BsPencilSquare } from "react-icons/bs";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { MdVideoCameraBack } from "react-icons/md";
import axios from "axios";
import { useState, useEffect, useRef, useContext } from "react";
import { SocketContext } from "../../Socket/socketContext";
import { useSelector, useDispatch } from "react-redux";
import { initUser, rdxDecFriendNoti } from "../../redux/slice/thisUser";
import { rdxOpenChat } from "../../redux/slice/openChat";
import { rdxDecMsgNoti, rdxAddFriend } from "../../redux/slice/thisUser";
import {
    rdxSetMsgNoti,
    rdxSetFriendNoti,
} from "../../redux/slice/notification";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";

const Notification = ({
    notificationType,
    setShowNotification,
    onClickOutside,
}) => {
    // type 是 msg 或者 friend. 意思是 新消息通知 or 好友申请通知
    // const [TotalCount, setTotalCount] = useState(0);

    const this_user = useSelector((s) => s.user);
    // const open_chat = useSelector((s) => s.chat);
    const notificaion = useSelector((s) => s.noti);
    const disp = useDispatch();
    // const [AllNotification, setAllNotification] = useState([]);
    const self = useRef(null);
    const [ModalOpen, setModalOpen] = useState(false);
    const friendObj = useRef({});
    const { Socket } = useContext(SocketContext);
    const clickModal = useRef(false);

    useEffect(() => {
        getNotification();
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.addEventListener("click", handleClickOutside, true);
        };
    }, [onClickOutside]);

    // useEffect(() => {
    // console.log("opend chatt", open_chat, AllNotification);
    //     if (open_chat.isOpen === false) return;
    //     for (let noti of AllNotification) {
    //         if (noti.chatId == open_chat.chatId) {
    //             axios.post("/deleteNotification", {
    //                 _id: this_user._id,
    //                 type: notificationType.current,
    //                 chatId: open_chat.chatId,
    //             });
    //             disp(rdxDecMsgNoti(noti.count));
    //             break;
    //         }
    //     }
    // }, [open_chat]);

    function handleClickOutside(e) {
        // 这里，是当鼠标点击 component 以外的位置，就关掉 notification window
        if (self.current && !self.current.contains(e.target)) {
            if (clickModal.current == true) {
                return;
            }
            // console.log("clicked outside");
            onClickOutside && onClickOutside(); // 这行代码没啥，只是不让这里的代码重复跑 2 次
            setShowNotification(false);
        }
    }

    function getNotification() {
        axios
            .get("/getNotification", {
                params: { _id: this_user._id, type: notificationType.current },
            })
            .then(({ data }) => {
                // console.log("noti get", data);
                if (data == undefined) return;
                // setAllNotification(data);
                let sumCount = 0;
                if (notificationType.current == "msg") {
                    disp(rdxSetMsgNoti(data));
                    sumCount = data.reduce((a, b) => a + b.count, 0);
                    disp(initUser({ msgNotificationCount: sumCount }));
                } else if (notificationType.current == "friend") {
                    disp(rdxSetFriendNoti(data));
                    sumCount = data.length;
                    disp(initUser({ friendNotificationCount: sumCount }));
                }
                // console.log("sumCount: ", sumCount);
            });
    }

    function msgNotificationClick(e) {
        let obj = { ...e };
        // console.log("obj: ", obj);

        disp(rdxOpenChat(obj));
        setShowNotification(false);
        // 删除这个 notification! (消红点) -> 消除带有 chatId 的 notification
        // axios.post("/deleteNotification", {
        //     _id: this_user._id,
        //     type: notificationType.current,
        //     chatId: e.chatId,
        // });
        // disp(rdxDecMsgNoti(obj.count));
    }

    // function displayName(e) {
    //     if (notificationType.current == "msg") {
    //         return e.chatName;
    //     }
    //     if (notificationType.current == "friend") {
    //         return e.name;
    //     }
    // }
    // function displayText(e) {
    //     if (notificationType.current == "msg") {
    //         return e.lastMsg;
    //     }
    //     if (notificationType.current == "friend") {
    //         return e.requestMsg;
    //     }
    // }

    function drawAll() {
        if (notificationType.current == "msg") {
            // console.log("draw msg");
            return notificaion.msgNotification.map((e, idx) => {
                return (
                    <div
                        className="top-nav-one-contact"
                        key={idx}
                        onClick={() => msgNotificationClick(e)}
                    >
                        <img src={e.pro} alt="pro" />
                        <div className="text">
                            <div className="name">{e.chatName}</div>
                            <div className="message">{e.lastMsg}</div>
                        </div>
                        <div className="red-dot-2">{e.count}</div>
                    </div>
                );
            });
        } else if (notificationType.current == "friend") {
            return notificaion.friendNotification.map((e, idx) => {
                return (
                    <div
                        className="top-nav-one-contact"
                        key={idx}
                        onClick={() => friendNotificationClick(e)}
                    >
                        <img src={e.pro} alt="pro" />
                        <div className="text">
                            <div className="name">{e.name}</div>
                            <div className="message">{e.requestMsg}</div>
                        </div>
                        <div className="red-dot-2 blue">{e.count}</div>
                    </div>
                );
            });
        }
    }
    function addFriend() {
        // console.log("on add");
        axios
            .post("/addFriend", {
                self: this_user,
                other: friendObj.current,
            })
            .then(({ data }) => {
                deleteFriendRequest();
                let chatId = data.chatId;
                let other = data.other;
                let { _id, name, pro } = this_user;
                // console.log("? ", this_user, other);
                Socket.emit("add friend", other._id, {
                    _id,
                    name,
                    pro,
                    chatId,
                });
                disp(rdxAddFriend({ ...other, chatId }));
            });
    }
    function deleteFriendRequest() {
        // console.log("on delete");
        axios.post("/deleteNotification", {
            _id: this_user._id,
            type: notificationType.current,
            chatId: null,
            friendId: friendObj.current._id,
        });
        finish();
    }

    function friendNotificationClick(e) {
        // friend noti e = {_id, pro, name, requestMsg}
        friendObj.current = e;
        setModalOpen(true);
        // let add = window.confirm("Accept Friend Request?");
        // if (add) {
        //     addFriend();
        // } else {
        //     deleteFriendRequest();
        // }
    }
    function finish() {
        // console.log("finish");
        disp(rdxDecFriendNoti());
        setShowNotification(false);
    }

    function drawModal() {
        return (
            <Modal
                isOpen={ModalOpen}
                onMouseEnter={() => {
                    clickModal.current = true;
                }}
                onMouseLeave={() => {
                    clickModal.current = false;
                }}
            >
                <ModalHeader toggle={() => setModalOpen(false)}>
                    Accept Friend Request?
                </ModalHeader>
                <ModalBody>
                    <div
                        className="top-nav-one-contact"
                        style={{ display: "flex" }}
                    >
                        <img src={friendObj.current.pro} alt="pro" />
                        <div className="text">
                            <div className="name">{friendObj.current.name}</div>
                            <div className="message">
                                {friendObj.current.requestMsg}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={addFriend}>Accept</Button>
                    <Button onClick={deleteFriendRequest}>Reject</Button>
                </ModalFooter>
            </Modal>
        );
    }

    return (
        <div id="top-notification" ref={self}>
            {drawModal()}
            <div className="first-line">
                <span>
                    {notificationType.current == "msg"
                        ? "Chats"
                        : "Friend Requests"}
                </span>
                <div className="icon">
                    <BsThreeDots className="ri" />
                </div>
                <div className="icon">
                    <HiOutlineArrowsExpand className="ri" />
                </div>
                <div className="icon">
                    <MdVideoCameraBack className="ri" />
                </div>
                <div className="icon">
                    <BsPencilSquare className="ri" />
                </div>
            </div>
            <input placeholder="Search ..." />

            {drawAll()}

            {/* <div className="top-nav-one-contact">
                <img src={nobody} alt="pro" />
                <div className="text">
                    <div className="name">Name Nothing</div>
                    <div className="message">recent message here....</div>
                </div>
                <div className="red-dot-2">3</div>
            </div>
            <div className="top-nav-one-contact">
                <img />
                <div className="text">
                    <div className="name">Name Nothing</div>
                    <div className="message">recent message here....</div>
                </div>
                <div
                    className={
                        notificationType.current === "chat"
                            ? "red-dot-2"
                            : "red-dot-2 blue"
                    }
                >
                    2
                </div>
            </div> */}
        </div>
    );
};

export default Notification;
