import '../../scss/login/login-right.scss';

const LoginRight = () => {
    return (
        <div id="login-right">
            <input placeholder="Email .." />
            <input placeholder="Password .." />
            <div id="log-in-btn">Log In</div>
            <div id="forget-password">Forget Password?</div>
            <hr></hr>
            <div id="new-account">
                <div>Create new account</div>
            </div>
            <div id="foot-note">
                <span>Create a Page</span> for a celebrity, brand or business.
            </div>
        </div>
    );
};

export default LoginRight;
