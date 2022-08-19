import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Retry from "../components/Retry";
import { DELETE_MEETUP, UPDATE_MEETUP } from "../gqlQueries/mutations";
import { GET_MEETUP_BY_ID } from "../gqlQueries/queries";
import classes from "./styles/MeetupDetail.module.css";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/deleted.json";
import dayjs from "dayjs";
import MeetupSuccess from "../components/MeetupSuccess";

const DeletedLottie = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={300} width={300} />;
};

function MeetupDetail() {
  const { state } = useLocation();
  const allowEdit = state.allowEdit;
  const { meetupId } = useParams();
  const navigate = useNavigate();
  const [meetupDeleted, setMeetupDeleted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [meetupUpdated, setMeetupUpdated] = useState(false);

  const {
    loading: meetuploading,
    error: meetupError,
    data,
  } = useQuery(GET_MEETUP_BY_ID, {
    variables: { meetupId },
    fetchPolicy: "no-cache",
  });
  const [deleteMeetup, { loading, error }] = useMutation(DELETE_MEETUP, {
    refetchQueries: ["getMyProfile", "getAllMeetups"],
  });
  const [updateMeetup, { error: updateMeetupError }] = useMutation(
    UPDATE_MEETUP,
    {
      refetchQueries: ["getMyProfile", "getAllMeetups"],
    }
  );
  const [meetup, setMeetup] = useState(data?.meetup);

  const handleOnMeetupDelete = () => {
    deleteMeetup({
      variables: {
        id: meetupId,
      },
    });
    setMeetupDeleted(true);
    setTimeout(() => navigate("/", { replace: true }), 2800);
  };

  const handleOnEdit = () => {
    setIsEditable(true);
  };

  const handleOnSave = () => {
    updateMeetup({
      variables: {
        id: meetupId,
        meetup,
      },
    });
    setIsEditable(false);
    setMeetupUpdated(true);
    setTimeout(() => navigate("/", { replace: true }), 3200);
  };

  const handleChange = (e) => {
    setMeetup({
      ...meetup,
      [e.target.name]: e.target.value,
    });
  };
  if (meetupUpdated) return <MeetupSuccess />;
  if (meetuploading || loading) return <Loading />;
  if (meetupError || error || updateMeetupError) {
    return <Retry />;
  }
  if (meetupDeleted) return <DeletedLottie />;

  const InfoSection = (props) => {
    const { title, info, icon } = props;
    const iconImg = icon ?? "check";
    return (
      <div className={classes["info-section"]}>
        <div>
          <i class="medium material-icons">{iconImg}</i>
        </div>
        <div>
          <div className={classes["title"]}>{title}</div>
          <div className={classes["info"]}>{info}</div>
        </div>
      </div>
    );
  };
  const Divider = () => {
    return <div className={classes["divider"]}></div>;
  };
  const date = dayjs(data.meetup.meetupDate).format("DD/MMM/YYYY");

  return (
    <div className={classes["meetup-detail-container"]}>
      <div className={classes["meetup-banner"]}>
        <img
          src={
            data?.meetup?.image ??
            `https://source.unsplash.com/random/?${meetupId},technology`
          }
          alt="pic"
        />
      </div>
      <h4>Meetup Details </h4>
      <Divider />
      <div className={classes["meetup-details"]}>
        <div className={classes["info-section"]}>
          <div>
            <i class="medium material-icons">group</i>
          </div>
          <div>
            <div className={classes["title"]}>{"Meetup:"}</div>
            <div className={classes["info"]}>
              {isEditable ? (
                <input
                  type="text"
                  className={classes["title"]}
                  placeholder="Meetup"
                  value={(meetup && meetup.title) ?? data.meetup.title}
                  name="title"
                  onChange={handleChange}
                  required
                />
              ) : (
                data.meetup.title
              )}
            </div>
          </div>
        </div>
        <div className={classes["info-section"]}>
          <div>
            <i class="medium material-icons">insert_comment</i>
          </div>
          <div>
            <div className={classes["title"]}>{"Desciption:"}</div>
            <div className={classes["info"]}>
              {isEditable ? (
                <input
                  type="text"
                  className={classes["title"]}
                  placeholder="Desciption"
                  value={
                    (meetup && meetup.description) ?? data.meetup.description
                  }
                  name="description"
                  onChange={handleChange}
                  required
                />
              ) : (
                data.meetup.description
              )}
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className={classes["meetup-details"]}>
        <InfoSection
          title={"Location:"}
          info={data.meetup.location}
          icon={"gps_fixed"}
        />
        <InfoSection title={"Meetup Date:"} info={date} icon={"date_range"} />
      </div>
      <Divider />
      <div className={classes["meetup-details"]}>
        <InfoSection
          title={"Organizer:"}
          info={data.meetup.userId.firstName}
          icon={"person_pin"}
        />
        <InfoSection
          title={"Contact:"}
          info={data.meetup.userId.email}
          icon={"markunread"}
        />
      </div>
      <Divider />
      {allowEdit && (
        <div className={classes["btn-container"]}>
          {isEditable && (
            <button className="btn green" onClick={handleOnSave}>
              Save
            </button>
          )}
          {!isEditable && (
            <>
              <button className="btn green" onClick={handleOnEdit}>
                Edit
              </button>
              <button
                type="button"
                onClick={handleOnMeetupDelete}
                className="btn red"
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MeetupDetail;
