import axios from "axios";
import "../../scss/login/login.scss";

import LoginLeft from "./Left/loginLeft";
import LoginRight from "./loginRight";
import SignupWindow from "./signUpWindow";

import {
    auth,
    google_provider,
    facebook_provider,
} from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

const qwe = console.log.bind(console.log);

const LoginMain = () => {
    let navi = useNavigate();
    const [LoggedIn, setLoggedIn] = useState(false);
    const [SignUpOpen, setSignUpOpen] = useState(false);
    const email = useRef("");
    const password = useRef("");
    const firstName = useRef("");
    const lastName = useRef("");
    const [ChosenPro, setChosenPro] = useState(null);

    useEffect(() => {
        axios({
            method: "get",
            url: "/checkLogin",
        }).then((e) => {
            // console.log(e);
            if (e.data !== false) {
                // toMain(e.data);
            }
        });
    }, []);

    function toMain(email) {
        // console.log('has email', email);
        navi("/main", { state: email });
    }

    function registerValidate() {
        let s1 = firstName.current;
        let s2 = lastName.current;
        let s3 = email.current;

        s1 = s1.trim();
        if (s1.length === 0) return false;
        s1 = s1.charAt(0).toUpperCase() + s1.slice(1);
        s2 = s2.trim();
        if (s2.length === 0) return false;
        s2 = s2.charAt(0).toUpperCase() + s2.slice(1);
        s3 = s3.trim();
        if (s3.length === 0) return false;
        s3 = s3.charAt(0).toUpperCase() + s3.slice(1);

        firstName.current = s1;
        lastName.current = s2;
        email.current = s3;

        if (ChosenPro == null) return false;
        return true;
    }

    function onRegister() {
        let valid = registerValidate();
        if (!valid) {
            alert("plase enter all fields, and chose a profile icon :)");
            return;
        }
        axios({
            method: "post",
            url: "/register",
            data: {
                email: email.current,
                password: password.current,
                firstName: firstName.current,
                lastName: lastName.current,
                pro: ChosenPro,
            },
        })
            .then((e) => {
                // qwe("register good", e);
                toMain(e.data);
            })
            .catch((e) => {
                qwe("regi unsuccessful", e.response);
            });
    }

    function onLogin() {
        axios({
            method: "post",
            url: "/login",
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
                qwe("login not good", e.response);
            });
    }

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
                        setChosenPro,
                        ChosenPro,
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
