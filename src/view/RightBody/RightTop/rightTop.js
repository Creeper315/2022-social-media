import Card from "./card";
import h1 from "../../../img/hiring1.jpeg";
import h2 from "../../../img/hiring2.jpeg";

const RightTop = () => {
    return (
        <div id="body-right-top">
            <div className="head">Sponsored</div>
            <Card imgSrc={h1} h1="Some dummy text" txt="tong315.com" />
            <Card
                imgSrc={h2}
                h1="BMO NewStart Banking"
                txt="bmo.com/newstart"
            />
        </div>
    );
};

export default RightTop;
