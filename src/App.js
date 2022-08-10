import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LoginMain from './view/Login/login_main';
import MainPage from './view/MainPage/mainPage';
import NotFound from './view/MainPage/notFound404';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<LoginMain />}></Route>
                    <Route path="/main" element={<MainPage />}></Route>
                    <Route path="/*" element={<NotFound />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
