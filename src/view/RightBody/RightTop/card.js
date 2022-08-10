const Card = ({ imgSrc, h1, txt }) => {
    return (
        <div id="card">
            <div className="menu"></div>
            <img src={imgSrc} alt="img" />
            <div id="two-line">
                <div>{h1}</div>
                <div>{txt}</div>
            </div>
        </div>
    );
};

export default Card;
