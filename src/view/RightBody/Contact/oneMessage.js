import profile from '../../../img/profile.jpeg';

const OneMessage = ({ fromOther, time, pro, text }) => {
    if (!fromOther) fromOther = false;
    return (
        <>
            {fromOther ? (
                <div className="message from-other">
                    <img src={pro} alt="pro" />
                    <div className="msg-content">{text}</div>
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
