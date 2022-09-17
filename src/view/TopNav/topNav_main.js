import "../../scss/topNav/top-nav-main.scss";
import "../../scss/topNav/notification.scss";

import profile_default from "../../img/pro0.jpeg";
import SearchMenu from "./searchMenu";
import { BsSearch } from "react-icons/bs";
import { BsMessenger } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import Notification from "./notification";

import axios from "axios";
import { useRef, useState, useEffect, useContext } from "react";
import { SocketContext } from "../../Socket/socketContext";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rdxIncFriendNoti } from "../../redux/slice/thisUser";

const TopNavMain = () => {
    const this_user = useSelector((s) => s.user);
    const disp = useDispatch();
    const navi = useNavigate();
    const { Socket } = useContext(SocketContext);
    const [ListUserFound, setListUserFound] = useState([]);
    const inputRef = useRef(null);
    const withinSearch = useRef(false);
    const [ShowSearchMenu, setShowSearchMenu] = useState(false);
    const [ShowNotification, setShowNotification] = useState(false);
    const [ShowLogOut, setShowLogOut] = useState(false);
    const notificationType = useRef("");

    useEffect(() => {
        Socket.on("friend request", () => {
            disp(rdxIncFriendNoti());
        });
        return () => {
            Socket.off("friend request");
        };
    }, []);

    function clearInput() {
        inputRef.current.value = "";
        setListUserFound([]);
        setShowSearchMenu(false);
    }

    function clickAdd(e, requestMsg) {
        // send friend request
        // Socket, inc friend noti

        // 对方：同意： post /addFriiend , delete friend noti
        // 拒绝： delete friend noti

        // console.log("clicked add, sending request", e);
        function filter(obj) {
            return { name: obj.name, pro: obj.pro, _id: obj._id };
        }

        if (requestMsg == undefined)
            requestMsg = `I'm ${this_user.name}, nice to meet you`;
        console.log("click ad", requestMsg);
        axios
            .post("/friendRequest", {
                requester: filter(this_user),
                receiver: filter(e),
                requestMsg,
            })
            .then(({ data: isNewRequest }) => {
                if (!isNewRequest) return;
                Socket.emit("friend request", e._id); // 通知这个 _id 的 user，increament 他的 friend notification
            });
    }

    function filterFound(listUser) {
        let s = new Set(this_user.friend.map((e) => e._id));
        return listUser.filter((e) => !s.has(e._id) && e._id !== this_user._id);
    }

    function onText(e) {
        let text = e.target.value;
        text = text.trim();
        if (text.length === 0) {
            setListUserFound([]);
            return;
        }
        // console.log('ttt', text);
        axios({
            method: "get",
            url: "/getUserByName",
            params: { text },
        }).then(({ data }) => {
            data = filterFound(data);

            setListUserFound(data);
        });
    }

    function searchBarActive() {
        if (ShowSearchMenu) return " active ";
        return "";
    }

    function logout() {
        let out = window.confirm("Sure To Logout ?");
        if (!out) return;
        axios({ method: "get", url: "/logout" }).then(() => {
            navi("/");
        });
    }
    return (
        <div id="top-nav-main">
            {/* {ShowLogOut && <div className="log-out"></div>} */}
            {ShowNotification && (
                <Notification {...{ notificationType, setShowNotification }} />
            )}
            <img
                src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                alt="facebook-logo"
                className="fb-logo"
            />
            <div
                className={"icon search-icon " + searchBarActive()}
                // className={'icon search-icon active'}
                onClick={() => {
                    setShowSearchMenu(true);
                    inputRef.current.focus();
                }}
                onMouseOver={() => (withinSearch.current = true)}
                onMouseLeave={() => (withinSearch.current = false)}
            >
                {ShowSearchMenu && (
                    <SearchMenu
                        {...{
                            ListUserFound,
                            setListUserFound,
                            withinSearch,
                            clickAdd,
                            clearInput,
                        }}
                    />
                )}
                <BsSearch className="ri" />
                <input
                    placeholder="Search New Friends"
                    onChange={onText}
                    ref={inputRef}
                    onBlur={() => {
                        if (!withinSearch.current) setShowSearchMenu(false);
                    }}
                />
            </div>
            <div
                className="icon messenger-icon"
                onClick={() => {
                    notificationType.current = "msg";
                    setShowNotification(true);
                }}
            >
                <div className="red-dot">{this_user.msgNotificationCount}</div>
                <BsMessenger className="ri" />
            </div>
            <div
                className="icon no-icon"
                onClick={() => {
                    notificationType.current = "friend";
                    setShowNotification(true);
                }}
            >
                <div className="red-dot">
                    {this_user.friendNotificationCount}
                </div>
                <FaBell className="ri" />
            </div>
            <div className="icon pro-icon" onClick={logout}>
                <img src={this_user.pro} alt="profile" />
                <BiChevronDown className="ri" />
            </div>
        </div>
    );
};

export default TopNavMain;
