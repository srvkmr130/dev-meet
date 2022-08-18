import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/signUpSuccessful.json";
import "./styles/Lottie.css";

function SignUpSuccessful() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="display-flex margin-top">
      <Lottie options={defaultOptions} width={"60%"} />
    </div>
  );
}

export default SignUpSuccessful;
