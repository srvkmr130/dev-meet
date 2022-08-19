import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./styles/Meetup.module.css";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/show-more-icon.json";

const ShowMoreLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={30} width={150} />;
};
function Meetup(props) {
  const { title, id, name, isFromDashBoard, isCurrentUser, meetupId } = props;
  const navigate = useNavigate();
  const handleOnKnowMore = () => {
    navigate(`/meetup/${meetupId}`, { state: { allowEdit: isCurrentUser } });
  };
  return (
    <div className={classes["meetup"]}>
      <div className={classes["img-banner"]}>
        <img
          src={`https://source.unsplash.com/random/?${meetupId},technology`}
          alt="pic"
        />
      </div>
      <div className={classes["meetup-info-container"]}>
        <h5>{title}</h5>
        {isFromDashBoard && (
          <div className={classes["meetup-info"]}>
            Host :
            <Link to={`/profile/${id}`}>
              <span className="right-align"> {name}</span>
            </Link>
          </div>
        )}
        <div onClick={handleOnKnowMore} className={classes["know-more"]}>
          <div>
            Know More
            <ShowMoreLottie />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meetup;
