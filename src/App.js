import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginMain from './view/Login/login_main';
import MainPage from './view/MainPage/mainPage';
import NotFound from './view/MainPage/notFound404';
import Socket from './socket';

import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginMain />}></Route>
                        <Route path="/main" element={<MainPage />}></Route>
                        <Route path="/socket" element={<Socket />}></Route>
                        <Route path="/*" element={<NotFound />}></Route>
                    </Routes>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
