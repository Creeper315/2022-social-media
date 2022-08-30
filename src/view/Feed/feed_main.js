import '../../scss/feed/feed-main.scss';
import TextArea from './textArea';
import OneFeed from './oneFeed';

const FeedMain = () => {
    return (
        <div id="feed-main">
            <TextArea />
            <OneFeed />
            <OneFeed />
            <OneFeed />
        </div>
    );
};

export default FeedMain;
