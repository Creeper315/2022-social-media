import profile_img from "../../../img/pro0.jpeg";

const Card = () => {
    return (
        <div className="card">
            <div>
                <img
                    style={{ objectFit: "cover", gridRow: 1 }}
                    src={profile_img}
                    alt="profile"
                />
            </div>
            <div>Richard</div>
        </div>
    );
};

export default Card;
