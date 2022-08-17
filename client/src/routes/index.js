import CreateMeetup from "../components/CreateMeetup";
import Home from "../components/Home";
import Login from "../components/Login";
import OtherUserProfile from "../components/OtherUserProfile";
import Profile from "../components/Profile";
import SignUp from "../components/SignUp";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Login />;
};
export const routes = (isLoggedIn) => [
  { path: "/", element: <Home /> },
  {
    path: "/create",
    element: (
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <CreateMeetup />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/profile",
    element: (
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/:userId",
    element: (
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <OtherUserProfile />
      </ProtectedRoute>
    ),
  },
];
