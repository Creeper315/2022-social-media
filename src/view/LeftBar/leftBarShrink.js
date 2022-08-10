import '../../scss/leftBar/leftBarShrink.scss';

import profile from '../../img/profile.jpeg';
import icecream from '../../img/icecream.jpg';
import milk from '../../img/milk.jpg';

import RectIcon from './rectIcon';
import RoundIcon from './roundIcon';

import { FaHouseUser } from 'react-icons/fa';
import { CgMenuGridO } from 'react-icons/cg';
import { MdGroups } from 'react-icons/md';
import { BsLink45Deg } from 'react-icons/bs';

const i1 = 'https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/FhOLTyUFKwf.png';
const i2 = 'https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/MN44Sm-CTHN.png';
const i3 = 'https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/Cx_zTHRcUJ0.png';

const LeftBarShrink = () => {
    return (
        <div id="left-bar-shrink">
            <RectIcon icon={<FaHouseUser className="ri" />} />
            <RectIcon imgUrl={profile} />
            <RoundIcon icon={<CgMenuGridO className="ri" />} />
            <RectIcon imgUrl={i1} />
            <RectIcon imgUrl={i2} />
            <RectIcon imgUrl={i3} />
            <RoundIcon icon={<MdGroups className="ri" />} />
            <RectIcon imgUrl={milk} />
            <RectIcon imgUrl={profile} />
            <RectIcon imgUrl={icecream} />
            <RoundIcon icon={<BsLink45Deg className="ri" />} />
        </div>
    );
};

export default LeftBarShrink;
