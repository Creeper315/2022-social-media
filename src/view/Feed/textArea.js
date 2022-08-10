import { ImVideoCamera } from 'react-icons/im';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { FaRegLaugh } from 'react-icons/fa';
import profile from '../../img/profile.jpeg';

const TextArea = () => {
    return (
        <div id="text-area">
            <div id="upper">
                <img src={profile} alt="profile" />
                <input placeholder="What's on your mind? Richard" />
            </div>

            <hr />
            <div id="lower">
                <div>
                    <ImVideoCamera className="ri" />
                    Live video
                </div>
                <div>
                    <HiOutlinePhotograph className="ri" />
                    Photo/video
                </div>
                <div>
                    <FaRegLaugh className="ri" />
                    Feeling/activity
                </div>
            </div>
        </div>
    );
};

export default TextArea;
