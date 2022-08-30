import { BsThreeDots } from 'react-icons/bs';

const Card = ({ imgSrc, h1, txt }) => {
    return (
        <div className="card">
            <div className="menu">
                <BsThreeDots className="ri" />
            </div>
            <img src={imgSrc} alt="img" />

            <div className="line-1">{h1}</div>
            <div className="line-2">{txt}</div>
        </div>
    );
};

export default Card;
