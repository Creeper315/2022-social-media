const RectIcon = ({ icon, imgUrl }) => {
    return (
        <div className="icon rect-icon ">
            {icon ? icon : null}
            {imgUrl ? <img src={imgUrl} alt="icon" /> : null}
            <p>Home</p>
        </div>
    );
};

export default RectIcon;
