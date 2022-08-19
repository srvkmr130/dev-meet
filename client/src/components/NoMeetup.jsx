import React from "react";
import Lottie from "react-lottie";
import "./styles/Lottie.css";
import animationData from "../assets/lotties/no-search-result.json";

const NothingFoundLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={400} width={400} />;
};
function NoMeetup() {
  return (
    <div className={"nothing-found"}>
      <NothingFoundLottie />
      <div className="text">No meetup Found</div>
    </div>
  );
}

export default NoMeetup;
