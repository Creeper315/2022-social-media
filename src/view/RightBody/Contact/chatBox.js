import nobody from "../../../img/nobody.jpeg";

import {
    BsFillTelephoneFill,
    BsFillCameraVideoFill,
    BsFillEmojiSmileFill,
    BsFillPlusCircleFill,
} from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import OneMessage from "./oneMessage";

import {
    useState,
    useRef,
    useEffect,
    useContext,
    useImperativeHandle,
    forwardRef,
} from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { rdxCloseChat } from "../../../redux/slice/openChat";
import { SocketContext } from "../../../Socket/socketContext";
export const initialLoadAmount = 10;
export const additionLoadAmount = 2;

const ChatBox = forwardRef(
    (
        {
            // chatType,
            setBoxOpen,
            getChatHistory,
            // ChatInfo,
            // clearChatInfo,
            AllChatMessage,
            setAllChatMessage,
        },
        ref
    ) => {
        const this_user = useSelector((e) => e.user);
        const open_chat = useSelector((e) => e.chat);
        const disp = useDispatch();
        const scrollDiv = useRef();
        const prevScrollHeight = useRef(null);
        const Msg = useRef("");
        const recordTopChatId = useRef("");
        const loadMsg1 = "⏏️ Load More";
        const loadMsg2 = "-- No More Messages --";
        const [LoadMessage, setLoadMessage] = useState(loadMsg1);
        const [ViewBottomMessage, setViewBottomMessage] = useState(false);
        const { Socket } = useContext(SocketContext);

        useEffect(() => {
            return () => {
                // clearChatInfo();
                disp(rdxCloseChat());
                setAllChatMessage([]); // 这样，关掉聊天窗的时候，message array 就是 []
            };
        }, []);

        useEffect(() => {
            // 这里一个 trick！
            // 每当收到新消息，或者 scroll top 加载更多消息时候, AllChatMessage 的 length 会更长
            // 所以这里我们可以修改 scroll top
            // 最初 chat box 打开时候，previous Scroll Height 是 0，然后 AllChatMessage 第一次 load 时候我们需要已经 scroll 到了最下方。
            // 所以当 prevScrollHeight.current == 0 时，直接 scroll 最下方。或者当别人给我发消息时，scroll 最下方
            // 如果是往上翻，加载更多历史消息，这时候 prevScrollHeight 就不是 0. 所以我们保留当前的 scroll height。这样看起来更自然
            // console.log(
            //     "msg list change:",
            //     prevScrollHeight.current,
            //     scrollDiv.current.scrollHeight
            // );
            if (AllChatMessage.length === 0) return;

            if (prevScrollHeight.current === null) {
                // initial Load
                scrollToBottom();
            } else if (prevScrollHeight.current > 0) {
                // 要么加载更多历史记录，要么自己发信息，要么别人给我发信息
                if (recordTopChatId.current !== AllChatMessage[0]._id) {
                    // 加载更多历史消息
                    // console.log("更多。", recordTopChatId);
                    keepTopScrollAmount();
                } else if (
                    AllChatMessage[AllChatMessage.length - 1].senderId ===
                    this_user._id
                ) {
                    // console.log(
                    //     "自己",
                    //     AllChatMessage[AllChatMessage.length - 1],
                    //     this_user._id
                    // );
                    //自己发的消息，滑动到最下面
                    scrollToBottom();
                } else {
                    // 别人发的消息
                    // 不改变 scroll，如果当前视角看不到最新的消息的话，聊天页面上显示 View New Meesage ↓
                    // console.log("别人");
                    let { scrollHeight, scrollTop, clientHeight } =
                        scrollDiv.current;
                    let bottomDistance =
                        scrollHeight - scrollTop - clientHeight;
                    // console.log(
                    //     "btm dist",
                    //     bottomDistance,
                    //     scrollHeight,
                    //     scrollTop,
                    //     clientHeight
                    // );
                    if (bottomDistance > 50) {
                        setViewBottomMessage(true);
                    }
                }
            }
            recordTopChatId.current =
                AllChatMessage[0] && AllChatMessage[0]._id;
            prevScrollHeight.current = scrollDiv.current.scrollHeight;
        }, [AllChatMessage]);

        // function up

        function sendMsg() {
            // 首先用 socket 发送出去，然后自己再储存到 MongoDB 的 chatid 里面。
            // 不管对方的 socket 有没有收到，都要储存 MongoDB，因为如果对方没有打开 chat Window，就收不到咱们的消息。
            if (Msg.current.trim() === "") {
                alert("msg is empty");
                return;
            }

            const msgObj = {
                chatId: open_chat.chatId,
                text: Msg.current,
                senderId: this_user._id,
                pro: this_user.pro,
                time: "2022-09-01",
                name: this_user.name,
            };

            axios
                .post("/newMsg", {
                    msgObj,
                })
                .then((e) => {
                    Socket.emit("send msg", msgObj);
                });
            Msg.current = "";
        }

        function onScroll() {
            let { scrollTop, scrollHeight, clientHeight } = scrollDiv.current;
            // console.log(scrollTop, scrollHeight, clientHeight);
            if (scrollTop > 0 || LoadMessage === loadMsg2) return; // 要么还没 scroll 到顶端，要么是已经加载完所有 chat history 了
            // scroll 到了顶端

            getChatHistory(open_chat.chatId, additionLoadAmount).then(
                ({ data: moreChat }) => {
                    if (moreChat.length === 0) {
                        // 当加载完所有 chat history，设置 load message = loadMessage2
                        setLoadMessage(loadMsg2);
                        return;
                    }
                    setAllChatMessage((arr) => {
                        return [...moreChat, ...arr];
                    });
                }
            );
        }

        function scrollToBottom() {
            let { scrollHeight, clientHeight } = scrollDiv.current;
            scrollDiv.current.scrollTop = scrollHeight - clientHeight;
        }
        function keepTopScrollAmount() {
            scrollDiv.current.scrollTop =
                scrollDiv.current.scrollHeight - prevScrollHeight.current;
        }

        useImperativeHandle(ref, () => ({
            test() {
                console.log("called in Chat Box");
            },
            canLoadMoreMessage(yesICan) {
                if (yesICan) setLoadMessage(loadMsg1);
                else setLoadMessage(loadMsg2);
            },
            scrollToBottom,
        }));

        function getTopIcon() {
            if (open_chat.type === "group") return nobody;
            return open_chat.pro;
        }

        return (
            <div className="chat-box">
                <div className="chat-top">
                    <img src={getTopIcon()} alt="pro" />
                    <div className="profile-name">{open_chat.chatName}</div>
                    <div className="top-btn">
                        <BsFillTelephoneFill className="ri" />
                    </div>
                    <div className="top-btn">
                        <BsFillCameraVideoFill className="ri" />
                    </div>
                    <div className="top-btn">
                        <AiOutlineMinus className="ri" />
                    </div>
                    <div className="top-btn" onClick={() => setBoxOpen(false)}>
                        <FaTimes className="ri" />
                    </div>
                </div>
                <div
                    className="chat-history"
                    ref={scrollDiv}
                    onScroll={onScroll}
                >
                    <div className="padd">{LoadMessage}</div>

                    {AllChatMessage.map((e, idx) => {
                        let fromOther = true;
                        if (e.senderId === this_user._id) fromOther = false;

                        return (
                            <OneMessage
                                key={idx}
                                fromOther={fromOther}
                                pro={e.pro}
                                time={e.time}
                                text={e.text}
                                name={e.name}
                            />
                        );
                    })}
                </div>
                <div className="chat-input">
                    {ViewBottomMessage && (
                        <div
                            className="view-bottom"
                            onClick={() => {
                                setViewBottomMessage(false);
                                scrollToBottom();
                            }}
                        >
                            New Message ↓
                        </div>
                    )}
                    <div className="plus-sign">
                        <BsFillPlusCircleFill className="ri" />
                    </div>
                    <div className="input-contain">
                        <input
                            placeholder="Aa"
                            onChange={(e) => {
                                Msg.current = e.target.value;
                            }}
                            onKeyDownCapture={(e) => {
                                if (e.key === "Enter") sendMsg();
                            }}
                        />
                        <div className="emoji">
                            <BsFillEmojiSmileFill className="ri" />
                        </div>
                    </div>
                    <div
                        className="send"
                        onClick={() => {
                            sendMsg();
                        }}
                    >
                        <IoSend className="ri" />
                    </div>
                </div>
            </div>
        );
    }
);

export default ChatBox;
