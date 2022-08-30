import '../../scss/login/login-signup.scss';
import { FaTimes } from 'react-icons/fa';
import { useRef } from 'react';

const SignupWindow = ({
    setSignUpOpen,
    email,
    password,
    firstName,
    lastName,
    onRegister,
}) => {
    return (
        <div id="sign-up-window">
            <div className="mask"></div>
            <div className="window">
                <div className="first-line">
                    Sign Up
                    <FaTimes
                        className="ri"
                        onClick={() => setSignUpOpen(false)}
                    />
                </div>
                <div className="row">
                    <input
                        placeholder="first name"
                        onChange={(e) => (firstName.current = e.target.value)}
                    />
                    <input
                        placeholder="last name"
                        onChange={(e) => (lastName.current = e.target.value)}
                    />
                </div>
                <div className="row">
                    <input
                        placeholder="email"
                        onChange={(e) => (email.current = e.target.value)}
                    />
                </div>
                <div className="row">
                    <input
                        placeholder="password"
                        onChange={(e) => (password.current = e.target.value)}
                    />
                </div>
                <button className="button" onClick={onRegister}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignupWindow;
