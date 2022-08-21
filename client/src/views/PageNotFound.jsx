import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/page-not-found.json";
import "../components/styles/Lottie.css";

const PageNotFoundLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} width={"50%"} />;
};

function PageNotFound() {
  return (
    <div className={"nothing-found"}>
      <PageNotFoundLottie />
      <div className="text">Page Not Found</div>
    </div>
  );
}

export default PageNotFound;
