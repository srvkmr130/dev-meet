import React from "react";
import { Link } from "react-router-dom";
import classes from "./styles/Meetup.module.css";

function Meetup(props) {
  const { title, id, name, location, date, isFromDashBoard, key } = props;
  return (
    <div className={classes["meetup"]}>
      <div className={classes["img-banner"]}>
        <img
          src={`https://source.unsplash.com/random/?${date + key},technology`}
          alt="pic"
        />
      </div>
      <div className={classes["meetup-info-container"]}>
        <h5>{title}</h5>
        {isFromDashBoard && (
          <div className={classes["meetup-info"]}>
            <Link to={`/profile/${id}`}>
              Host :<span className="right-align"> {name}</span>
            </Link>
          </div>
        )}
        <h6>Venue : {location ?? "Online"}</h6>
      </div>
    </div>
  );
}

export default Meetup;
