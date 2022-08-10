import '../../scss/rightBody/body-right-main.scss';
import RightTop from './RightTop/rightTop';
import Contact from './Contact/contact_main';

const RightBodyMain = () => {
    return (
        <div id="body-right-main">
            <RightTop />
            <Contact />
        </div>
    );
};

export default RightBodyMain;
