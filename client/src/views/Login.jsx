import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqlQueries/mutations";
import { useDispatch } from "react-redux";
import { loginUserActionCreator } from "../features/auth";
import Loading from "../components/Loading";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/login.json";
import classes from "./styles/Login.module.css";

const LoginLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} width={"90%"} />;
};
export default function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signinUser, { error, loading }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.user.token);
      dispatch(
        loginUserActionCreator({
          isLoggedIn: true,
        })
      );
      navigate("/", { replace: true });
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signinUser({
      variables: {
        userSignin: formData,
      },
    });
  };
  if (loading) return <Loading />;

  return (
    <div className={classes["login-container"]}>
      <div>
        <LoginLottie />
      </div>
      <div className={classes["login"]}>
        {error && <div className="red card-panel">{error.message}</div>}
        <h4>Login :</h4>
        <form onSubmit={handleSubmit}>
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
          <Link to="/signup">
            <p>Dont have an account ?</p>
          </Link>

          <button className="btn #673ab7 deep-purple" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
