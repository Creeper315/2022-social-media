import { IoMdClose } from "react-icons/io";

import axios from "axios";
import { useRef, useState, useContext } from "react";
import { SocketContext } from "../../Socket/socketContext";
import { useSelector } from "react-redux";

const AddPostModal = ({ setShowModal }) => {
    const { Socket } = useContext(SocketContext);
    const [text, settext] = useState("");
    const btnRef = useRef();
    const this_user = useSelector((s) => s.user);
    // console.log("..", this_user);
    function onPost() {
        let str = text.trim();
        if (str.length === 0) return;
        // console.log(
        //     "clicked post",
        //     this_user,
        //     this_user.friend.map((e) => e._id)
        // );
        //  _id, pro, name, text, listFriendId
        axios
            .post("/addFeed", {
                _id: this_user._id,
                pro: this_user.pro,
                name: this_user.name,
                text: str,
                listFriendId: this_user.friend.map((e) => e._id),
            })
            .then(({ data }) => {
                console.log("post then", data);

                settext("");
                setShowModal(false);
            });
    }

    return (
        <div id="add-post-background">
            <div className="add-post-modal">
                <div
                    className="icon"
                    onClick={() => {
                        setShowModal(false);
                    }}
                >
                    <IoMdClose className="ri" />
                </div>
                <textarea
                    placeholder="What's on your mind?"
                    onChange={(e) => {
                        let str = e.target.value;
                        str = str.trim();
                        settext(str);
                        if (str.length > 0) {
                            btnRef.current.classList.add("active");
                        } else {
                            btnRef.current.classList.remove("active");
                        }
                    }}
                ></textarea>
                <button ref={btnRef} onClick={onPost}>
                    Post
                </button>
            </div>
        </div>
    );
};

export default AddPostModal;
