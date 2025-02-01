import LoginPage from "../Pages/LoginPage";
import CoursesPage from "../Pages/CoursesPage";
import Error404Page from "../Pages/Error404Page";
import DashboardPage from "../Pages/DashboardPage";
import UserInfoPage from "../Pages/UserInfoPage";
import UsersInfoPage from "../Pages/UsersInfoPage";
import BannedUsersPage from "../Pages/BannedUsersPage";
import CommentsPage from "../Pages/CommentsPage";
import OffTicketsPage from "../Pages/OffTicketsPage";
import SignupPage from "../Pages/SignupPage";
import PrivateRoutes from "../Components/PrivateRoutes";

const Router = [
  { path: "/", element: <LoginPage /> },
  { path: "/sign-up", element: <SignupPage /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardPage />
      </PrivateRoutes>
    ),
  },
  {
    path: "/users-info",
    element: (
      <PrivateRoutes>
        <UsersInfoPage />
      </PrivateRoutes>
    ),
  },
  {
    path: "/user-info/:userID",
    element: (
      <PrivateRoutes>
        <UserInfoPage />
      </PrivateRoutes>
    ),
  },
  {
    path: "/courses",
    element: (
      <PrivateRoutes>
        <CoursesPage />
      </PrivateRoutes>
    ),
  },
  {
    path: "/banned-users",
    element: (
      <PrivateRoutes>
        <BannedUsersPage />
      </PrivateRoutes>
    ),
  },
  {
    path: "/comments",
    element: (
      <PrivateRoutes>
        <CommentsPage />
      </PrivateRoutes>
    ),
  },
  {
    path: "/off-tickets",
    element: (
      <PrivateRoutes>
        <OffTicketsPage />
      </PrivateRoutes>
    ),
  },
  { path: "*", element: <Error404Page /> },
];

export default Router;
