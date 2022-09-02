import { IoMdClose } from "react-icons/io";
import nobody from "../../../img/nobody.jpeg";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { rdxAddGroup } from "../../../redux/slice/thisUser";
import { Button } from "reactstrap";

import { useState, useContext } from "react";
import { SocketContext } from "../../../Socket/socketContext";

const AddGroupBox = ({ setAddGroupOpen }) => {
    const this_user = useSelector((s) => s.user);
    const { Socket } = useContext(SocketContext);
    const disp = useDispatch();
    const [SelectedFriends, setSelectedFriends] = useState([]);
    const [FoundFriends, setFoundFriends] = useState([]); // {active: boolean, userObj: {}}

    function onTypeText(e) {
        let text = e.target.value;
        text = text.trim();

        if (text.length === 0) {
            setFoundFriends([]);
            return;
        }

        axios
            .get("/getFriendByName", { params: { _id: this_user._id, text } })
            .then((e) => {
                console.log(e.data);
                setFoundFriends(e.data);
            });
    }
    function drawSelectedFriends() {
        return SelectedFriends.map((e, idx) => {
            function remove() {
                setSelectedFriends((list) => {
                    list.splice(idx, 1);
                    return [...list];
                });
            }
            return (
                <div className="one-name" key={idx}>
                    <div>{e.name} </div>
                    <div className="icon" onClick={remove}>
                        <IoMdClose className="ri" />
                    </div>
                </div>
            );
        });
    }

    function drawFoundFriends() {
        return FoundFriends.map((e, idx) => {
            let selected = false;
            for (let f of SelectedFriends) {
                if (f._id == e._id) {
                    selected = true;
                    break;
                }
            }

            const onclick = () => {
                // console.log("selected?", selected);
                if (selected) {
                    setSelectedFriends((list) =>
                        list.filter((f) => f._id != e._id)
                    );
                } else {
                    setSelectedFriends((list) => {
                        list.push(e);
                        return [...list];
                    });
                }
            };

            return (
                <div
                    className={selected ? "line-4 active" : "line-4"}
                    key={idx}
                    onClick={onclick}
                >
                    <div className="icon">
                        <img src={e.pro} alt="img" />
                    </div>
                    <div>{e.name}</div>
                </div>
            );
        });
    }

    function onAddGroup() {
        if (SelectedFriends.length <= 1) {
            alert("Need at least 2 friends to create a group");
            return;
        }
        axios
            .post("/createGroup", {
                friend: SelectedFriends,
            })
            .then((e) => {
                let { chatId, name, listUserId } = e.data;
                // console.log(chatId, name);

                setAddGroupOpen(false);
                setSelectedFriends([]);
                setFoundFriends([]);

                Socket.emit("create group", chatId, name, listUserId);
                // disp(rdxAddGroup({ chatId, name }));
            });
    }

    return (
        <div className="add-group-main">
            <div className="line-1">
                <Button className="add-btn" onClick={onAddGroup}>
                    Add To Group
                </Button>
                <IoMdClose
                    className="ri"
                    onClick={() => setAddGroupOpen(false)}
                />
            </div>
            <div className="line-2">
                <div className="to">To:</div>
                <div className="name-contain">
                    <div className="one-name">
                        <div>hogn noww kajbsfkabkbf kabfkjab </div>
                        <div className="icon">
                            <IoMdClose className="ri" />
                        </div>
                    </div>
                    <div className="one-name">
                        <div>hogn noww</div>
                        <div className="icon">
                            <IoMdClose className="ri" />
                        </div>
                    </div>
                    {drawSelectedFriends()}

                    <input placeholder="search" onChange={onTypeText} />
                </div>
            </div>
            <div className="line-3">
                <div>Suggested:</div>
                <div></div>
            </div>
            <div className="line-4">
                <div className="icon">
                    <img src={nobody} alt="img" />
                </div>
                <div>Name here</div>
            </div>
            <div className="line-4">
                <div className="icon">
                    <img src={nobody} alt="img" />
                </div>
                <div>Name here2</div>
            </div>
            {drawFoundFriends()}
        </div>
    );
};

export default AddGroupBox;
