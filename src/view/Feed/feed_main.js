import "../../scss/feed/feed-main.scss";
import TextArea from "./textArea";
import OneFeed from "./oneFeed";
import AddPostModal from "./addPostModal";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

const FeedMain = () => {
    const [ShowModal, setShowModal] = useState(false);
    const this_user = useSelector((s) => s.user);
    const [ListFeed, setListFeed] = useState([]); // this_user 里面的，只是 list of feed _id. 这个是 list feed object

    useEffect(() => {
        // console.log("effect  feed", this_user.feed);
        reloadFeed();
    }, [this_user._id]);

    function reloadFeed() {
        if (this_user._id == undefined || this_user._id === "") return;
        axios
            .post("/feedHistory", {
                _id: this_user._id,
            })
            .then(({ data }) => {
                // console.log("get feed history", data);
                data.reverse();
                setListFeed(data);
            });
    }

    function drawFeed() {
        return ListFeed.map((e, idx) => {
            let obj = {
                _id: e.user,
                pro: e.pro,
                name: e.name,
                text: e.text,
                comment: e.comment,
            };
            return <OneFeed {...obj} key={idx} />;
        });
    }

    return (
        <div id="feed-main">
            {ShowModal && <AddPostModal {...{ setShowModal, reloadFeed }} />}
            <button onClick={reloadFeed} className="reload-feed">
                Reload feed
            </button>
            <TextArea {...{ setShowModal }} />
            {/* <OneFeed /> */}
            {drawFeed()}
        </div>
    );
};

export default FeedMain;
