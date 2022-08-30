import '../../scss/main.scss';

import TopNavMain from '../TopNav/topNav_main';
import LeftBarShrink from '../LeftBar/leftBarShrink';
import FeedMain from '../Feed/feed_main';
import RightBodyMain from '../RightBody/rightBody_main';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slice/thisUser';
import axios from 'axios';

const MainPage = () => {
    const location = useLocation();
    const navi = useNavigate();
    const disp = useDispatch();
    // const this_user = useSelector((s) => s.user);

    useEffect(() => {
        check();
    }, []);

    function check() {
        // 1 看 location state 里面的 info 是否存在
        // 2 看 info 的 user 是否还有 session？ 如果没有，就回到 login
        // 3 拿到这个 info（email）的用户的个人信息。储存到 ThisUser 里面，
        console.log('has location', location.state);

        if (location.state == null) {
            // navi('/');
            return;
        }
        axios({
            method: 'get', // 因为 api 里面，都会先检查 session 的。
            url: '/getUser',
            params: {
                email: location.state,
            },
        })
            .then((e) => {
                console.log('got user', e.data);
                let name = e.data.firstName + ' ' + e.data.lastName;
                disp(setUser({ ...e.data, name: name }));
            })
            .catch((e) => {
                console.log('check false', e);
                // navi('/');
            });
    }

    return (
        <div id="main-page">
            <TopNavMain />
            <div id="main-body">
                <LeftBarShrink />
                <div id="main-body2">
                    <FeedMain />
                    <RightBodyMain />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
