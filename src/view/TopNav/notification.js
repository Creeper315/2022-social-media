import nobody from "../../img/nobody.jpeg";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initUser } from "../../redux/slice/thisUser";
import { rdxOpenChat } from "../../redux/slice/openChat";
import { rdxDecMsgNoti } from "../../redux/slice/thisUser";

const Notification = ({
    notificationType,
    setShowNotification,
    onClickOutside,
}) => {
    // type 是 msg 或者 friend. 意思是 新消息通知 or 好友申请通知
    // const [TotalCount, setTotalCount] = useState(0);

    const this_user = useSelector((s) => s.user);
    const disp = useDispatch();
    const [AllNotification, setAllNotification] = useState([]);
    const self = useRef(null);

    useEffect(() => {
        getNotification();
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.addEventListener("click", handleClickOutside, true);
        };
    }, [onClickOutside]);

    function handleClickOutside(e) {
        // 这里，是当鼠标点击 component 以外的位置，就关掉 notification window
        if (self.current && !self.current.contains(e.target)) {
            console.log("clicked outside");
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
                console.log("noti get", data);
                if (data == undefined) return;
                setAllNotification(data);
                console.log("data: ", data);

                let sumCount = data.reduce((a, b) => a + b.count, 0);
                console.log("sumCount: ", sumCount);
                disp(initUser({ msgNotificationCount: sumCount }));
            });
    }

    function notificationClick(e) {
        let obj = { type: notificationType.current, ...e };
        disp(rdxOpenChat(obj));
        setShowNotification(false);
        // 删除这个 notification! (消红点) -> 消除带有 chatId 的 notification
        axios.post("/deleteNotification", {
            _id: this_user._id,
            type: notificationType.current,
            chatId: e.chatId,
        });
        disp(rdxDecMsgNoti());
    }

    function drawAll() {
        return AllNotification.map((e, idx) => {
            return (
                <div
                    className="one-contact"
                    key={idx}
                    onClick={() => {
                        console.log("clicked", e);
                        // noti e = {chatId, count, friendId, lastMsg, name, pro}
                        notificationClick(e);
                    }}
                >
                    <img src={e.pro} alt="pro" />
                    <div className="text">
                        <div className="name">{e.chatName}</div>
                        <div className="message">{e.lastMsg}</div>
                    </div>
                    <div
                        className={
                            notificationType.current === "msg"
                                ? "red-dot-2"
                                : "red-dot-2 blue"
                        }
                    >
                        {e.count}
                    </div>
                </div>
            );
        });
    }

    return (
        <div id="top-notification" ref={self}>
            <div className="first-line">
                <span>Chats</span>
                <div className="icon"></div>
                <div className="icon"></div>
                <div className="icon"></div>
                <div className="icon"></div>
            </div>
            <input placeholder="Search Chats..." />

            <div className="one-contact">
                <img src={nobody} alt="pro" />
                <div className="text">
                    <div className="name">Name Nothing</div>
                    <div className="message">recent message here....</div>
                </div>
                <div className="red-dot-2">3</div>
            </div>
            <div className="one-contact">
                <img />
                <div className="text">
                    <div className="name">Name Nothing</div>
                    <div className="message">recent message here....</div>
                </div>
                <div
                    className={
                        notificationType.currennt === "chat"
                            ? "red-dot-2"
                            : "red-dot-2 blue"
                    }
                >
                    2
                </div>
            </div>
            {drawAll()}
        </div>
    );
};

export default Notification;
