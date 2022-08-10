import '../../scss/login/login.scss';

import LoginLeft from './Left/loginLeft';
import LoginRight from './loginRight';

const LoginMain = () => {
    return (
        <div id="login-main">
            <LoginLeft />
            <LoginRight />
        </div>
    );
};

export default LoginMain;
