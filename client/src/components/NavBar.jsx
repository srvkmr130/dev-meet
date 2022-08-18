import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserActionCreator } from "../features/auth";
import { useDispatch } from "react-redux";
import classes from "./styles/NavBar.module.css";
import brandLogo from "../assets/images/brandLogo.png";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav>
      <div className="nav-wrapper #81d4fa light-blue lighten-3">
        <Link to="/" className={classes.brandLogo}>
          <img alt="brandLogoImage" src={brandLogo} />
        </Link>
        <ul id="nav-mobile" className={classes.navLinks}>
          {token ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                    dispatch(
                      logoutUserActionCreator({
                        isLoggedIn: false,
                      })
                    );
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
