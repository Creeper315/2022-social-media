import profile from "../../../img/pro0.jpeg";

const OneMessage = ({ fromOther, time, pro, text, name }) => {
    if (!fromOther) fromOther = false;
    return (
        <>
            {fromOther ? (
                <div className="message from-other">
                    <img src={pro} alt="pro" />
                    <div className="msg-contain">
                        <span>{name}</span>
                        <div className="msg-content">{text}</div>
                    </div>
                </div>
            ) : (
                <div className="message ">
                    <div className="msg-content">{text}</div>
                </div>
            )}
        </>
    );
};

export default OneMessage;
