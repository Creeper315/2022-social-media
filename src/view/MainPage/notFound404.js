import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navi = useNavigate();

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <h2>404 Page Not Found</h2>
            <Button
                className="btn btn-primary"
                onClick={() => {
                    navi('/');
                }}
            >
                Back To Login
            </Button>
        </div>
    );
};

export default NotFound;
