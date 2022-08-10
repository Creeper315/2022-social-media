const RoundIcon = ({ icon, imgUrl }) => {
    return (
        <div className="icon round-icon">
            {icon ? icon : null}
            {imgUrl ? <img src={imgUrl} alt="icon" /> : null}
            <p>Home</p>
        </div>
    );
};

export default RoundIcon;
