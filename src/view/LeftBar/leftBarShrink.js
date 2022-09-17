import "../../scss/leftBar/leftBarShrink.scss";

import profile from "../../img/pro0.jpeg";
import icecream from "../../img/icecream.jpg";
import milk from "../../img/milk.jpg";

import RectIcon from "./rectIcon";
import RoundIcon from "./roundIcon";

import { FaHouseUser } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import { MdGroups } from "react-icons/md";
import { BsLink45Deg } from "react-icons/bs";

const i1 = "https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/FhOLTyUFKwf.png";
const i2 = "https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/MN44Sm-CTHN.png";
const i3 = "https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/Cx_zTHRcUJ0.png";

const LeftBarShrink = () => {
    return (
        <div id="left-bar-shrink">
            <RectIcon icon={<FaHouseUser className="ri" />} text="Home" />
            <RectIcon imgUrl={profile} text="Richard Jia" />
            <RoundIcon icon={<CgMenuGridO className="ri" />} text="Menu" />
            <RectIcon imgUrl={i1} text="Watch" />
            <RectIcon imgUrl={i2} text="Marketplace" />
            <RectIcon imgUrl={i3} text="Gaming" />
            <RoundIcon icon={<MdGroups className="ri" />} text="Groups" />
            <RectIcon imgUrl={milk} text="PHforces" />
            <RectIcon imgUrl={profile} text="Walter Gage North Tower" />
            <RectIcon imgUrl={icecream} text="Walter Gage North Tower" />
            <RoundIcon icon={<BsLink45Deg className="ri" />} text="Shortcuts" />
            <RectIcon imgUrl={icecream} text="Sugar Crush" />
        </div>
    );
};

export default LeftBarShrink;
