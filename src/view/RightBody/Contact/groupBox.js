// import pro from "../../../img/nobody.jpeg";

// import {
//     BsFillTelephoneFill,
//     BsFillCameraVideoFill,
//     BsFillEmojiSmileFill,
//     BsFillPlusCircleFill,
// } from "react-icons/bs";
// import { AiOutlineMinus } from "react-icons/ai";
// import { FaTimes } from "react-icons/fa";
// import { IoSend } from "react-icons/io5";
// import OneMessage from "./oneMessage";

// import {
//     useRef,
//     useEffect,
//     useContext,
//     useImperativeHandle,
//     forwardRef,
// } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { SocketContext } from "../../../Socket/socketContext";

// const GroupBox = forwardRef(
//     (
//         {
//             setGroupBoxOpen,
//             getChatHistory,
//             ChatInfo,
//             AllChatMessage,
//             setAllChatMessage,
//         },
//         ref
//     ) => {
//         const this_user = useSelector((e) => e.user);
//         const scrollDiv = useRef();

//         const { Socket } = useContext(SocketContext);

//         useEffect(() => {
//             return () => {
//                 setAllChatMessage([]); // 这样，关掉聊天窗的时候，message array 就是 []
//             };
//         }, []);

//         const Msg = useRef("");

//         function sendMsg() {
//             // 首先用 socket 发送出去，然后自己再储存到 MongoDB 的 chatid 里面。
//             // 不管对方的 socket 有没有收到，都要储存 MongoDB，因为如果对方没有打开 chat Window，就收不到咱们的消息。
//             if (Msg.current.trim() === "") {
//                 alert("msg is empty");
//                 return;
//             }

//             const msgObj = {
//                 chatId: ChatInfo.chatId,
//                 text: Msg.current,
//                 senderId: this_user._id,
//                 pro: this_user.pro,
//                 time: "2022-09-01",
//                 name: this_user.name,
//             };

//             axios
//                 .post("/newMsg", {
//                     msgObj,
//                 })
//                 .then((e) => {
//                     Socket.emit("send msg", msgObj);
//                 });
//             Msg.current = "";
//         }

//         useEffect(() => {
//             // scroll to bottom.
//             let { scrollHeight, clientHeight } = scrollDiv.current;
//             scrollDiv.current.scrollTop = scrollHeight - clientHeight + 10;
//         }, []);

//         // function scrollToBottom() {
//         //     let { scrollTop, scrollHeight, clientHeight } = scrollDiv.current;
//         //     scrollDiv.current.scrollTop = scrollHeight - clientHeight + 10;
//         // }

//         function onScroll() {
//             let { scrollTop } = scrollDiv.current;
//             // console.log(scrollTop, scrollHeight, clientHeight);
//             console.log("scroll reload");
//             if (scrollTop > 0) return;
//             // scroll 到了顶端
//             console.log("pagi load more");
//             getChatHistory(ChatInfo.chatId, 2).then((e) => {
//                 let moreChat = e.data;
//                 console.log("More Chat", moreChat);
//                 setAllChatMessage((arr) => {
//                     return [...moreChat, ...arr];
//                 });
//             });
//         }

//         useImperativeHandle(ref, () => ({
//             call() {
//                 console.log("called in Group Box");
//             },
//         }));

//         return (
//             <div className="chat-box">
//                 <div className="chat-top">
//                     <img src={ChatInfo.pro} alt="pro" />
//                     <div className="profile-name">{ChatInfo.name}</div>
//                     <div className="top-btn">
//                         <BsFillTelephoneFill className="ri" />
//                     </div>
//                     <div className="top-btn">
//                         <BsFillCameraVideoFill className="ri" />
//                     </div>
//                     <div className="top-btn">
//                         <AiOutlineMinus className="ri" />
//                     </div>
//                     <div
//                         className="top-btn"
//                         onClick={() => setGroupBoxOpen(false)}
//                     >
//                         <FaTimes className="ri" />
//                     </div>
//                 </div>
//                 <div
//                     className="chat-history"
//                     ref={scrollDiv}
//                     onScroll={onScroll}
//                 >
//                     {/* <OneMessage fromOther={true} msg="" pro="" time="" />
//                 <OneMessage fromOther={false} />
//                 <OneMessage fromOther={true} msg="" pro="" time="" />
//                 <OneMessage fromOther={false} />
//                 <OneMessage fromOther={true} />
//                 <OneMessage fromOther={true} msg="" pro="" time="" />
//                 <OneMessage fromOther={false} />
//                 <OneMessage fromOther={true} /> */}
//                     {AllChatMessage.map((e, idx) => {
//                         let fromOther = true;
//                         if (e.senderId === this_user._id) fromOther = false;

//                         return (
//                             <OneMessage
//                                 key={idx}
//                                 fromOther={fromOther}
//                                 pro={e.pro}
//                                 time={e.time}
//                                 text={e.text}
//                                 name={e.name}
//                             />
//                         );
//                     })}
//                 </div>
//                 <div className="chat-input">
//                     <div className="plus-sign">
//                         <BsFillPlusCircleFill className="ri" />
//                     </div>
//                     <div className="input-contain">
//                         <input
//                             placeholder="Aa"
//                             onChange={(e) => {
//                                 Msg.current = e.target.value;
//                             }}
//                         />
//                         <div className="emoji">
//                             <BsFillEmojiSmileFill className="ri" />
//                         </div>
//                     </div>
//                     <div
//                         className="send"
//                         onClick={() => {
//                             sendMsg();
//                         }}
//                     >
//                         <IoSend className="ri" />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// );

// export default GroupBox;
