import axios from 'axios';
import '../../scss/login/login.scss';

import LoginLeft from './Left/loginLeft';
import LoginRight from './loginRight';
import SignupWindow from './signUpWindow';

import {
    auth,
    google_provider,
    facebook_provider,
} from '../../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

const qwe = console.log.bind(console.log);

const LoginMain = () => {
    let navi = useNavigate();
    const [LoggedIn, setLoggedIn] = useState(false);
    const [SignUpOpen, setSignUpOpen] = useState(false);
    const email = useRef('');
    const password = useRef('');
    const firstName = useRef('');
    const lastName = useRef('');

    useEffect(() => {
        axios({
            method: 'get',
            url: '/checkLogin',
        }).then((e) => {
            // console.log(e);
            if (e.data !== false) {
                // toMain(e.data);
            }
        });
    }, []);

    function toMain(email) {
        // console.log('has email', email);
        navi('/main', { state: email });
    }

    function onRegister() {
        axios({
            method: 'post',
            url: '/register',
            data: {
                email: email.current,
                password: password.current,
                firstName: firstName.current,
                lastName: lastName.current,
            },
        })
            .then((e) => {
                qwe('register good', e);
                toMain(e.data);
            })
            .catch((e) => {
                qwe('regi unsuccessful', e.response);
            });
    }

    function onLogin() {
        axios({
            method: 'post',
            url: '/login',
            data: {
                email: email.current,
                password: password.current,
            },
        })
            .then((e) => {
                // qwe('login then', e);
                toMain(e.data);
            })
            .catch((e) => {
                qwe('login not good', e.response);
            });
    }

    //     function google_signin() {
    //         signInWithPopup(auth, google_provider).then((e) => {
    //             console.log('res', e);
    //             // window.eee = e;
    //             let email = e.user.email;
    //             let name = e.user.displayName;
    //             let profile = e.user.photoURL;

    //             // localStorage.setItem('isAuth', true);
    //             // setIsAuth(true);
    //             navi('/', { state: { ...{ email, name, profile } } });
    //         });
    //         return;
    //     }
    //     function facebook_signin() {
    //         signInWithPopup(auth, facebook_provider).then((e) => {
    //             console.log('fb res', e);
    //             window.eee = e;
    //             let email = e.user.email;
    //             let name = e.user.displayName;
    //             let profile = e.user.photoURL;

    //             // localStorage.setItem('isAuth', true);
    //             // setIsAuth(true);
    //             // navi('/', { state: { ...{ email, name, profile } } });
    //         });
    //         return;
    //     }

    //     function onRegister() {
    //         createUserWithEmailAndPassword(auth, email.current, password.current)
    //             .then((userCredential) => {
    //                 console.log(userCredential);
    //             })
    //             .catch((e) => console.log('register err', e));
    //     }

    //     function onLogin() {
    //         signInWithEmailAndPassword(auth, email.current, password.current)
    //             .then((userCredential) => {
    //                 console.log('sign in good', userCredential);
    //                 navi('/main', { state: { ...{ email } } });
    //             })
    //             .catch((e) => console.log('login err', e));
    //     }

    return (
        <div id="login-main">
            {SignUpOpen ? (
                <SignupWindow
                    {...{
                        setSignUpOpen,
                        email,
                        password,
                        firstName,
                        lastName,
                        onRegister,
                    }}
                />
            ) : null}
            <LoginLeft />
            <LoginRight {...{ email, password, onLogin, setSignUpOpen }} />
            <div className="official-sign-in">
                {/* <div onClick={google_signin}>Sign in with Google</div>
                <div onClick={facebook_signin}>Sign in with Facebook</div> */}
            </div>
        </div>
    );
};

export default LoginMain;
