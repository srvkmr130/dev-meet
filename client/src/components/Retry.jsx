import React from "react";
import Error from "./Error";
import "./styles/Lottie.css";

function Retry() {
  return (
    <div className={"nothing-found"}>
      <Error />
      <div className="text">OOPS! Something went wrong</div>
    </div>
  );
}

export default Retry;
