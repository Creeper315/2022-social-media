import { Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import { useState, useRef } from "react";
import a1 from "../../img/pro0.jpeg";
import a2 from "../../img/pro1.jpeg";
import a3 from "../../img/pro2.png";
import a4 from "../../img/pro3.jpeg";
import a5 from "../../img/pro4.jpeg";
import a6 from "../../img/pro5.jpeg";
import a7 from "../../img/pro6.jpeg";
import a8 from "../../img/pro7.jpeg";
import a9 from "../../img/pro8.jpeg";
import a10 from "../../img/pro9.jpeg";
import a11 from "../../img/pro10.jpeg";
import a12 from "../../img/pro11.jpeg";
import a13 from "../../img/pro12.jpeg";
import a14 from "../../img/pro13.jpeg";
import a15 from "../../img/pro14.jpeg";
import a16 from "../../img/pro15.png";
import a17 from "../../img/pro16.jpeg";
import a18 from "../../img/pro17.jpeg";
import a19 from "../../img/pro18.jpeg";

const ProBtn = ({ setChosenPro, ChosenPro }) => {
    const [PopIsOpen, setPopIsOpen] = useState(false);
    const btn = useRef();
    const allPro = [
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9,
        a10,
        a11,
        a12,
        a13,
        a14,
        a15,
        a16,
        a17,
        a18,
        a19,
    ];
    const sss = "48px";
    const imgStyle = {
        width: sss,
        height: sss,
        borderRadius: sss,
        objectFit: "cover",
        cursor: "pointer",
        boxShadow: "2px 1px 6px -3px grey",
    };

    function drawPro() {
        return allPro.map((e, idx) => {
            return (
                <img
                    key={idx}
                    src={e}
                    alt="."
                    style={imgStyle}
                    onClick={() => {
                        setChosenPro(e);
                        setPopIsOpen(false);
                    }}
                />
            );
        });
    }

    return (
        // <div className="pop-over">
        <>
            <div
                className="choose-pro btn btn-info"
                id="choose-pro-id"
                onClick={() => setPopIsOpen(true)}
                ref={btn}
            >
                Choose Your Profile Icon
                {ChosenPro && <img src={ChosenPro} alt="." />}
            </div>
            <Popover
                placement="top"
                isOpen={PopIsOpen}
                toggle={() => setPopIsOpen(!PopIsOpen)}
                target={btn}
            >
                <PopoverHeader>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ marginRight: "auto" }}>❤️</span>
                        <Button onClick={() => setPopIsOpen(false)}>
                            Close
                        </Button>
                    </div>
                </PopoverHeader>
                <PopoverBody>
                    <div
                        style={{
                            width: "200px",
                            height: "200px",
                            display: "flex",
                            gap: "10px",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            alignContent: "flex-start",
                            overflow: "scroll",
                            flexWrap: "wrap",
                        }}
                    >
                        {drawPro()}
                        {/* <img src={b} alt="." style={imgStyle} />
                        <img src={b} alt="." style={imgStyle} /> */}
                    </div>
                </PopoverBody>
            </Popover>
        </>
        // </div>
    );
};

export default ProBtn;
