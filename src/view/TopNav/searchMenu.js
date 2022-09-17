import "../../scss/topNav/search-menu.scss";
import { IoClose } from "react-icons/io5";
import { HiUserAdd } from "react-icons/hi";
import iii from "../../img/pro0.jpeg";
import axios from "axios";

import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Button,
    Input,
} from "reactstrap";
// import { useContext } from "react";
// import { SocketContext } from "../../Socket/socketContext";

const SearchMenu = ({
    ListUserFound,
    // setListUserFound,
    withinSearch,
    clickAdd,
    clearInput,
}) => {
    const this_user = useSelector((s) => s.user);
    const [ModalOpen, setModalOpen] = useState(false);
    const requestMsg = useRef("");
    const clickedObj = useRef({});
    // console.log('ooo', ListUserFound);

    function onclick(e) {
        // console.log("ock", e);
        clickedObj.current = e;
        setModalOpen(true);
    }

    function yes() {
        clickAdd(clickedObj.current, requestMsg.current);
        no();
    }

    function no() {
        setModalOpen(false);
        requestMsg.current = "";
        clearInput();
    }

    function drawModal() {
        return (
            <Modal isOpen={ModalOpen}>
                <ModalHeader toggle={() => setModalOpen(false)}>
                    Send Friend Request...
                </ModalHeader>
                <ModalBody>
                    <Input
                        placeholder="request message:"
                        onChange={(e) => {
                            requestMsg.current = e.target.value;
                        }}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={no}>Cancel</Button>
                    <Button onClick={yes}>Send</Button>
                </ModalFooter>
            </Modal>
        );
    }

    function displayPeople() {
        return ListUserFound.map((e, idx) => {
            return (
                <div className="one-row" key={idx}>
                    <img src={iii} alt="profile" />
                    <div className="name">{e.name}</div>
                    <div className="icon" onClick={() => onclick(e)}>
                        <HiUserAdd className="ri" />
                    </div>
                    <div className="icon">
                        <IoClose className="ri" />
                    </div>
                </div>
            );
        });
    }

    // const friendNotification = new mongoose.Schema({
    //     friendId: { type: mongoose.ObjectId, required: true }, // friend Id
    //     pro: String,
    //     name: String,
    //     requestMsg: String,
    // });

    return (
        <div
            id="top-search-menu"
            onMouseOver={() => (withinSearch.current = true)}
            onMouseLeave={() => (withinSearch.current = false)}
        >
            {drawModal()}
            <div> Results .... </div>
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
