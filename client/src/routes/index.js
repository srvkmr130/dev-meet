import CreateMeetup from "../views/CreateMeetup";
import Home from "../views/Home";
import Login from "../views/Login";
import MeetupDetail from "../views/MeetupDetail";
import OtherUserProfile from "../views/OtherUserProfile";
import Profile from "../views/Profile";
import SignUp from "../views/SignUp";

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
  {
    path: "/meetup/:meetupId",
    element: (
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <MeetupDetail />
      </ProtectedRoute>
    ),
  },
];
