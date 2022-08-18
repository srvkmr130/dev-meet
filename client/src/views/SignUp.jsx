import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import SignUpSuccessful from "../components/SignUpSuccessful";
import { SIGNUP_USER } from "../gqlQueries/mutations";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/sign-up.json";
import classes from "./styles/SignUp.module.css";

const SignUpLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} width={"60%"} />;
};

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        userNew: formData,
      },
    });
    setSignUpSuccess(true);
    setTimeout(() => navigate("/login"), 3800);
  };

  if (loading) return <Loading />;
  if (signUpSuccess) return <SignUpSuccessful />;

  return (
    <div className={classes["signup-container"]}>
      <div>
        <SignUpLottie />
      </div>
      <div className={classes["signup"]}>
        {error && <div className="red card-panel">{error.message}</div>}

        {data && data.user && (
          <div className="green card-panel">
            {data.user.firstName} - SignUp Successful !! You can login now!
          </div>
        )}
        <h4>Sign-Up :</h4>
        {data && data.user ? (
          <Link to="/login">
            <p>Login Now !</p>
          </Link>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
              required
            />
            <Link to="/login">
              <p>Already have an account ?</p>
            </Link>

            <button className="btn #673ab7 deep-purple" type="submit">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
