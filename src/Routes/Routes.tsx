import Error404Page from "../Pages/Error404Page";
import LandingPage from "../Pages/LandingPage";
import UserInfoPage from "../Pages/UserInfoPage";
import UsersInfoPage from "../Pages/UsersInfoPage";

const Router = [
  { path: "/", element: <LandingPage /> },
  { path: "/users-info", element: <UsersInfoPage /> },
  { path: "/user-info/:userID", element: <UserInfoPage /> },
  // { path: "/off-tickets", element: <OffTicketsPage /> },
  // { path: "/courses", element: <CoursesPage /> },
  // { path: "/comments", element: <CommentsPage /> },
  { path: "*", element: <Error404Page /> },
];

export default Router;
