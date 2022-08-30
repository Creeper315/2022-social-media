import { BsThreeDots } from 'react-icons/bs';
import { FiThumbsUp } from 'react-icons/fi';
import { VscComment } from 'react-icons/vsc';
import { RiShareForwardLine } from 'react-icons/ri';

import pro from '../../img/nobody.jpeg';
import icecream from '../../img/icecream.jpg';

const OneFeed = ({ content }) => {
    return (
        <div className="one-feed">
            <div className="first-line">
                <img src={pro} alt="pro" />
                <div className="usr-name">Name here</div>
                <div className="button">
                    <BsThreeDots className="ri" />
                </div>
            </div>
            <div className="feed-content-text">
                This is what happens when you think you don't need your regular
                morning nap, lol
            </div>
            <img src={icecream} alt="pic" className="main-pic" />
            <div className="options">
                <div>
                    <FiThumbsUp className="ri" />
                    Like
                </div>
                <div>
                    <VscComment className="ri" />
                    Comment
                </div>
                <div>
                    <RiShareForwardLine className="ri" />
                    Share
                </div>
            </div>
        </div>
    );
};

export default OneFeed;
