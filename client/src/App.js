import "./App.css";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { useRoutes } from "react-router";
import { routes } from "./routes";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUserActionCreator } from "./features/auth";
import jwt_decode from "jwt-decode";
import { isNil } from "rambda";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const routing = useRoutes(routes(isLoggedIn));
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      try {
        let decoded = jwt_decode(token);
        if (!isNil(decoded)) {
          dispatch(
            loginUserActionCreator({
              isLoggedIn: true,
            })
          );
        }
      } catch (err) {
        console.log("error", err);
      }
    }
  }, []);

  return (
    <div className="App">
      <NavBar />
      {routing}
    </div>
  );
}

export default App;
