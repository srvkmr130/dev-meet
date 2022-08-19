import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_USER_BY_ID } from "../gqlQueries/queries";
import Retry from "../components/Retry";
import Loading from "../components/Loading";
import Meetup from "../components/Meetup";
import "./styles/Home.css";
import Profile from "./Profile";
import NoMeetup from "../components/NoMeetup";

export default function OtherUserProfile() {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId },
  });
  const isCurrentUser = data?.user.isCurrentUser ?? false;
  if (loading) return <Loading />;
  if (error) {
    return <Retry />;
  }
  if (isCurrentUser) return <Profile />;
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
      <h3 className="text-center">
        {isCurrentUser ? `Your` : `${data.user.firstName}'s`} created Meetups :
      </h3>
      {data.user.meetups.length === 0 ? (
        <NoMeetup />
      ) : (
        <div className={"meetup-container"}>
          {data.user.meetups.map((meetup) => {
            return (
              <Meetup
                key={meetup._id}
                title={meetup.title}
                meetupId={meetup._id}
                location={meetup.location}
                date={meetup.meetupDate}
                image={meetup.image}
                isFromDashBoard={false}
                isCurrentUser={isCurrentUser}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
