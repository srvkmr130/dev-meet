import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/successful.json";

function MeetupSuccess() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={400} width={400} />;
}

export default MeetupSuccess;
