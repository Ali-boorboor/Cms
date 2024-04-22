import CoursesPage from "../Pages/CoursesPage";
import Error404Page from "../Pages/Error404Page";
import DashboardPage from "../Pages/DashboardPage";
import UserInfoPage from "../Pages/UserInfoPage";
import UsersInfoPage from "../Pages/UsersInfoPage";

const Router = [
  { path: "/", element: <DashboardPage /> },
  { path: "/users-info", element: <UsersInfoPage /> },
  { path: "/user-info/:userID", element: <UserInfoPage /> },
  { path: "/courses", element: <CoursesPage /> },
  // { path: "/banned-users", element: <BannedUsersPage /> },
  // { path: "/off-tickets", element: <OffTicketsPage /> },
  // { path: "/comments", element: <CommentsPage /> },
  { path: "*", element: <Error404Page /> },
];

export default Router;
