import '../../scss/login/login-right.scss';

const LoginRight = ({
    email,
    password,
    onRegister,
    onLogin,
    setSignUpOpen,
}) => {
    return (
        <div id="login-right">
            <input
                placeholder="Email .."
                onChange={(e) => (email.current = e.target.value)}
            />
            <input
                placeholder="Password .."
                onChange={(e) => (password.current = e.target.value)}
            />
            <div id="log-in-btn" onClick={onLogin}>
                Log In
            </div>
            <div id="forget-password">Forget Password?</div>
            <hr></hr>
            <div id="new-account" onClick={() => setSignUpOpen(true)}>
                <div>Create new account</div>
            </div>
            <div id="foot-note">
                <span>Create a Page</span> for a celebrity, brand or business.
            </div>
        </div>
    );
};

export default LoginRight;
