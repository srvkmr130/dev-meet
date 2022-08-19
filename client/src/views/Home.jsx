import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_MEETUPS } from "../gqlQueries/queries";
import Meetup from "../components/Meetup";
import Retry from "../components/Retry";
import "./styles/Home.css";
import Loading from "../components/Loading";
import NoMeetup from "../components/NoMeetup";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_MEETUPS);
  if (loading) return <Loading />;
  if (error) {
    return <Retry />;
  }
  if (data.meetups.length === 0) {
    return <NoMeetup />;
  }
  return (
    <div className={"meetup-container"}>
      {data &&
        data.meetups.map((meetup) => {
          return (
            <Meetup
              key={meetup._id}
              meetupId={meetup._id}
              title={meetup.title}
              location={meetup.location}
              date={meetup.meetupDate}
              image={meetup.image}
              id={meetup.userId._id}
              isFromDashBoard={true}
              name={meetup.userId.firstName}
            />
          );
        })}
    </div>
  );
}
