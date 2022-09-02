import "../../scss/topNav/search-menu.scss";
import { IoClose } from "react-icons/io5";
import { HiUserAdd } from "react-icons/hi";
import iii from "../../img/profile.jpeg";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { rdxAddFriend } from "../../redux/slice/thisUser";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../Socket/socketContext";
// import { addFriend } from "../../redux/slice/thisUser";

const SearchMenu = ({ ListUserFound, setListUserFound, withinSearch }) => {
    const disp = useDispatch();
    const { Socket } = useContext(SocketContext);
    const this_user = useSelector((s) => s.user);
    useEffect(() => {
        // Socket.on("add friend", ());
    }, []);

    // console.log('ooo', ListUserFound);
    function displayPeople() {
        return ListUserFound.map((e, idx) => {
            return (
                <div className="one-row" key={idx}>
                    <img src={iii} alt="profile" />
                    <div className="name">{e.name}</div>
                    <div className="icon" onClick={() => addFriend(e)}>
                        <HiUserAdd className="ri" />
                    </div>
                    <div className="icon" onClick={() => removeRow(idx)}>
                        <IoClose className="ri" />
                    </div>
                </div>
            );
        });
    }

    function addFriend(e) {
        console.log("other", e);
        axios
            .post("/addFriend", {
                self: this_user,
                other: e,
            })
            .then((e) => {
                let chatId = e.data.chatId;
                let other = e.data.other;
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

    function removeRow(idx) {
        // console.log('rm', ListUserFound, idx);
        // ListUserFound.splice(idx, 1);
        // console.log('rm2', ListUserFound, idx);
        // setListUserFound(ListUserFound);
    }

    // const disp = useDispatch();

    // function set() {
    //     disp(initUser({ name: 'new name!' }));
    // }

    return (
        <div
            id="top-search-menu"
            onMouseOver={() => (withinSearch.current = true)}
            onMouseLeave={() => (withinSearch.current = false)}
        >
            {/* <p>{JSON.stringify(this_user)}</p>
            <button onClick={set}>set</button> */}

            <div>Searches .... </div>
            {displayPeople()}
            {/* <div className="one-row">
                <img src={iii} alt="profile" />
                <div className="name">Name Here</div>
                <div className="icon">
                    <IoClose className="ri" />
                </div>
            </div>
            <div className="one-row">
                <img src={iii} alt="profile" />
                <div className="name">Name Here 222</div>
                <div className="icon">
                    <IoClose className="ri" />
                </div>
            </div> */}
        </div>
    );
};

export default SearchMenu;
