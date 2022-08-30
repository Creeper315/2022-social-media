const RectIcon = ({ icon, imgUrl, text }) => {
    return (
        <div className="icon rect-icon ">
            {icon ? icon : null}
            {imgUrl ? <img src={imgUrl} alt="icon" /> : null}
            <p>{text}</p>
        </div>
    );
};

export default RectIcon;
