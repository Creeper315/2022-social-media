import '../../scss/main.scss';

import TopNavMain from '../TopNav/topNav_main';
import LeftBarShrink from '../LeftBar/leftBarShrink';
import FeedMain from '../Feed/feed_main';
import RightBodyMain from '../RightBody/rightBody_main';

const MainPage = () => {
    return (
        <div id="main-page">
            <TopNavMain />
            <div id="main-body">
                <LeftBarShrink />
                <div id="main-body2">
                    <FeedMain />
                    <RightBodyMain />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
