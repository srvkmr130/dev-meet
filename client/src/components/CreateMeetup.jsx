import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_MEETUP } from "../gqlQueries/mutations";
import Retry from "./Retry";

export default function CreateMeetup() {
  const [meetup, setMeetup] = useState({});
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
    console.log("meetup", meetup);
    createMeetup({
      variables: {
        meetupInfo: meetup,
      },
    });
  };
  if (loading) return <h1>Loading</h1>;

  if (error) {
    return <Retry />;
  }
  if (data) {
    console.log(data);
  }
  return (
    <div className="container my-container">
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
        <button className="btn green">create</button>
      </form>
    </div>
  );
}
