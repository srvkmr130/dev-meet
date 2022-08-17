import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserActionCreator } from "../features/auth";
import { useDispatch } from "react-redux";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav>
      <div className="nav-wrapper #673ab7 deep-purple">
        <Link to="/" className="brand-logo left">
          Dev-Meet
        </Link>
        <ul id="nav-mobile" className="right">
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
                  className="red btn"
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
