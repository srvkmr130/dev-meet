import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_MEETUP } from "../gqlQueries/mutations";
import Retry from "../components/Retry";
import classes from "./styles/CreateMeetup.module.css";
import MeetupSuccess from "../components/MeetupSuccess";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

export default function CreateMeetup() {
  const [meetup, setMeetup] = useState({});
  const [meetupCreated, setMeetupCreated] = useState(false);
  const navigate = useNavigate();
  const [createMeetup, { loading, error, data }] = useMutation(CREATE_MEETUP, {
    refetchQueries: ["getMyProfile", "getAllMeetups"],
  });
  const handleChange = (e) => {
    setMeetup({
      ...meetup,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createMeetup({
      variables: {
        meetupInfo: meetup,
      },
    });
    setMeetupCreated(true);
    setTimeout(() => navigate("/", { replace: true }), 3200);
  };

  const resetHandler = (e) => {
    e.preventDefault();
  };

  if (loading) return <Loading />;
  if (meetupCreated) return <MeetupSuccess />;
  if (error) {
    return <Retry />;
  }
  return (
    <div className={classes["form-container"]}>
      {error && <div className="red card-panel">{error.message}</div>}
      {data && (
        <div className="green card-panel">
          Your meetup - {data.meetup.title} created successfully
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          required
          name="title"
          placeholder="Meetup title here"
        />
        <input
          type="text"
          placeholder="Describe your meetup ..."
          name="description"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          placeholder="Meetup Date"
          name="meetupDate"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          onChange={handleChange}
          required
        />
        <div className={classes["btn-container"]}>
          <button className="btn green">create</button>
          <button type="button" onClick={resetHandler} className="btn red">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
