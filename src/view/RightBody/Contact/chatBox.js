import pro from '../../../img/nobody.jpeg';

import {
    BsFillTelephoneFill,
    BsFillCameraVideoFill,
    BsFillEmojiSmileFill,
    BsFillPlusCircleFill,
} from 'react-icons/bs';
import { AiOutlineMinus } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import OneMessage from './oneMessage';

import { useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
const endpoint = 'http://localhost:5000';
const socket = io(endpoint);

const ChatBox = ({
    setBoxOpen,
    getChatHistory,
    Friend,
    AllChatMessage,
    setAllChatMessage,
    msgLoadAmount,
}) => {
    const this_user = useSelector((e) => e.user);
    const scrollDiv = useRef();

    // console.log('chat box opened: ', Friend, AllChatMessage);
    // console.log('chat box opened: ', Friend, AllChatMessage);

    socket.on('pong', (e) => {
        console.log('print', e);
    });
    useEffect(() => {
        // 当用户打开了这个聊天框的时候，我们的 socket 就需要告诉 server，让我 join 这个 chatId 的 room
        // 同时，开始 listen 对方可能发送来的消息。
        socket.emit('join chat room', Friend.chatId); // 在 use effect 里面加入房间，这样只加入 1 次。不然每次 page render 都会重新加入房间
        socket.on('receieve msg', (senderObj) => {
            // 日期 + 对方的 msg，画出来
            // console.log('rec msg', senderObj);
            receieveMsg(senderObj);
        });
        return () => {
            console.log('off');
            socket.off('receieve msg');
            setAllChatMessage([]); // 这样，关掉聊天窗的时候，message array 就是 []
        };
    }, []);

    const Msg = useRef('');

    function sendMsg() {
        // 首先用 socket 发送出去，然后自己再储存到 MongoDB 的 chatid 里面。
        // 不管对方的 socket 有没有收到，都要储存 MongoDB，因为如果对方没有打开 chat Window，就收不到咱们的消息。
        if (Msg.current.trim() === '') {
            alert('msg is empty');
            return;
        }

        const msgObj = {
            text: Msg.current,
            senderId: this_user._id,
            pro: this_user.pro,
            time: '',
            name: this_user.name,
        };

        socket.emit('send msg', Friend.chatId, msgObj);
        axios.post('/newMsg', {
            chatId: Friend.chatId,
            msgObj,
        });
    }

    function receieveMsg(senderObj) {
        // obj 里面是 .msg  ,  .id

        setAllChatMessage((arr) => [...arr, senderObj]);
    }

    useEffect(() => {
        // scroll to bottom.
        let { scrollHeight, clientHeight } = scrollDiv.current;
        scrollDiv.current.scrollTop = scrollHeight - clientHeight + 10;
    }, []);

    // function scrollToBottom() {
    //     let { scrollTop, scrollHeight, clientHeight } = scrollDiv.current;
    //     scrollDiv.current.scrollTop = scrollHeight - clientHeight + 10;
    // }

    function onScroll() {
        let { scrollTop } = scrollDiv.current;
        // console.log(scrollTop, scrollHeight, clientHeight);
        console.log('scroll reload');
        if (scrollTop > 0) return;
        // scroll 到了顶端
        console.log('pagi load more');
        getChatHistory(Friend.chatId).then((e) => {
            setAllChatMessage((arr) => {});
        });
    }

    return (
        <div className="chat-box">
            <div className="chat-top">
                <img src={Friend.pro} alt="pro" />
                <div className="profile-name">{Friend.name}</div>
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
            <div className="chat-history" ref={scrollDiv} onScroll={onScroll}>
                {/* <OneMessage fromOther={true} msg="" pro="" time="" />
                <OneMessage fromOther={false} />
                <OneMessage fromOther={true} />
                <OneMessage fromOther={true} msg="" pro="" time="" />
                <OneMessage fromOther={false} />
                <OneMessage fromOther={true} />
                <OneMessage fromOther={true} msg="" pro="" time="" />
                <OneMessage fromOther={false} />
                <OneMessage fromOther={true} />
                <OneMessage fromOther={true} msg="" pro="" time="" />
                <OneMessage fromOther={false} />
                <OneMessage fromOther={true} />
                <OneMessage fromOther={true} msg="" pro="" time="" />
                <OneMessage fromOther={false} />
                <OneMessage fromOther={true} />
                <OneMessage fromOther={true} msg="" pro="" time="" />
                <OneMessage fromOther={false} />
                <OneMessage fromOther={true} />
                <OneMessage fromOther={true} msg="" pro="" time="" />
                <OneMessage fromOther={false} />
                <OneMessage fromOther={true} /> */}
                {AllChatMessage.map((e, idx) => {
                    let fromOther = false;
                    if (e.senderId == Friend._id) fromOther = true;

                    return (
                        <OneMessage
                            key={idx}
                            fromOther={fromOther}
                            pro={e.pro}
                            time={e.time}
                            text={e.text}
                        />
                    );
                })}
            </div>
            <div className="chat-input">
                <div className="plus-sign">
                    <BsFillPlusCircleFill className="ri" />
                </div>
                <div className="input-contain">
                    <input
                        placeholder="Aa"
                        onChange={(e) => {
                            Msg.current = e.target.value;
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
};

export default ChatBox;
