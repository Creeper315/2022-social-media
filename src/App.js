import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginMain from "./view/Login/login_main";
import MainPage from "./view/MainPage/mainPage";
import NotFound from "./view/MainPage/notFound404";
import SocketProvider from "./Socket/socketContext";

import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <SocketProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<LoginMain />}></Route>
                            <Route path="/main" element={<MainPage />}></Route>
                            <Route path="/*" element={<NotFound />}></Route>
                        </Routes>
                    </Router>
                </SocketProvider>
            </div>
        </Provider>
    );
}

export default App;
