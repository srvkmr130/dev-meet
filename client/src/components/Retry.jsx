import React from "react";
import Login from "./Login";

function Retry() {
  return (
    <div className="container">
      <div className="red card-panel">
        Something went wrong ! Please login again
      </div>
      <Login />
    </div>
  );
}

export default Retry;
