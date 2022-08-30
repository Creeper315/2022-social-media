import axios from 'axios';
import '../../scss/topNav/top-nav-main.scss';
import profile_default from '../../img/profile.jpeg';
import SearchMenu from './searchMenu';
import { BsSearch } from 'react-icons/bs';
import { BsMessenger } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { BiChevronDown } from 'react-icons/bi';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopNavMain = () => {
    const navi = useNavigate();
    const [ListUserFound, setListUserFound] = useState([]);
    // const [BarFocused, setBarFocused] = useState(false);
    const inputRef = useRef(null);
    const withinSearch = useRef(false);
    const [ShowSearchMenu, setShowSearchMenu] = useState(false);

    function onText(e) {
        let text = e.target.value;
        text = text.trim();
        if (text.length === 0) {
            setListUserFound([]);
            return;
        }
        // console.log('ttt', text);
        axios({
            method: 'get',
            url: '/getUserByName',
            params: { text },
        }).then((e) => {
            console.log('search', e.data);
            setListUserFound(e.data);
        });
    }

    function searchBarActive() {
        if (ShowSearchMenu) return ' active ';
        return '';
    }

    function logout() {
        axios({ method: 'get', url: '/logout' }).then(() => {
            navi('/');
        });
    }
    return (
        <div id="top-nav-main">
            <img
                src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                alt="facebook-logo"
                className="fb-logo"
            />
            <div
                className={'icon search-icon ' + searchBarActive()}
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
                        {...{ ListUserFound, setListUserFound, withinSearch }}
                    />
                )}
                <BsSearch className="ri" />
                <input
                    placeholder="Search Friends"
                    onChange={onText}
                    ref={inputRef}
                    onBlur={() => {
                        if (!withinSearch.current) setShowSearchMenu(false);
                    }}
                />
            </div>
            <div className="icon messenger-icon">
                <div className="red-dot">1</div>
                <BsMessenger className="ri" />
            </div>
            <div className="icon no-icon">
                <FaBell className="ri" />
            </div>
            <div className="icon pro-icon" onClick={logout}>
                <img src={profile_default} alt="profile" />
                <BiChevronDown className="ri" />
            </div>
        </div>
    );
};

export default TopNavMain;
