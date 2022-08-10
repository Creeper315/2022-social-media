import '../../scss/topNav/top-nav-main.scss';
import profile_default from '../../img/profile.jpeg';
import { BsSearch } from 'react-icons/bs';
import { BsMessenger } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { BiChevronDown } from 'react-icons/bi';

const TopNavMain = () => {
    return (
        <div id="top-nav-main">
            <img
                src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                alt="facebook-logo"
                className="fb-logo"
            />
            <div className="icon search-icon active">
                <BsSearch className="ri" />
                <input placeholder="Search Friends" />
            </div>
            <div className="icon messenger-icon">
                <div className="red-dot">1</div>
                <BsMessenger className="ri" />
            </div>
            <div className="icon no-icon">
                <FaBell className="ri" />
            </div>
            <div className="icon pro-icon">
                <img src={profile_default} alt="profile" />
                <BiChevronDown className="ri" />
            </div>
        </div>
    );
};

export default TopNavMain;
