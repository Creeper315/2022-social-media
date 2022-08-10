import '../../../scss/login/login-left.scss';
import Card from './card';
import Card2 from './card2';

const LoginLeft = () => {
    return (
        <div id="login-left">
            <img
                src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                alt="facebook-logo"
                className="fb-logo"
            />
            <div className="recent">Recent Logins</div>
            <div className="text">Click your picture or add an account</div>
            <div className="card-contain">
                <Card />
                <Card2 />
            </div>
        </div>
    );
};

export default LoginLeft;
