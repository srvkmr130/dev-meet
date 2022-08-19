import { useQuery } from "@apollo/client";
import React from "react";
import { GET_MY_PROFILE } from "../gqlQueries/queries";
import Meetup from "../components/Meetup";
import Retry from "../components/Retry";
import "./styles/Home.css";
import Loading from "../components/Loading";
import NoMeetup from "../components/NoMeetup";

export default function Profile() {
  const { loading, error, data } = useQuery(GET_MY_PROFILE);
  if (loading) return <Loading />;
  if (error) {
    return <Retry />;
  }
  return (
    <div>
      <div className="center-align profile-header">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.user.firstName} {data.user.lastName}
        </h5>
        <h6>Email - {data.user.email}</h6>
      </div>
      <h3 className="text-center">Your meetups</h3>
      {data.user.meetups.length === 0 ? (
        <NoMeetup />
      ) : (
        <div className={"meetup-container"}>
          {data.user.meetups.map((meetup) => {
            return (
              <Meetup
                key={meetup._id}
                meetupId={meetup._id}
                title={meetup.title}
                location={meetup.location}
                date={meetup.meetupDate}
                image={meetup.image}
                isFromDashBoard={false}
                isCurrentUser={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
