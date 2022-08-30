const RoundIcon = ({ icon, imgUrl, text }) => {
    return (
        <div className="icon round-icon">
            {icon ? icon : null}
            {imgUrl ? <img src={imgUrl} alt="icon" /> : null}
            <p>{text}</p>
        </div>
    );
};

export default RoundIcon;
