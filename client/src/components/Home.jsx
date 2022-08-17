import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_ALL_MEETUPS } from "../gqlQueries/queries";
import Retry from "./Retry";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_MEETUPS);
  if (loading) return <h1>Loading</h1>;
  if (error) {
    return <Retry />;
  }
  return (
    <div className="container">
      {data &&
        data.meetups.map((meetup) => {
          return (
            <blockquote>
              <h6>{meetup.title}</h6>
              <Link to={`/profile/${meetup.userId._id}`}>
                <p className="right-align">~{meetup.userId.firstName}</p>
              </Link>
            </blockquote>
          );
        })}
    </div>
  );
}
