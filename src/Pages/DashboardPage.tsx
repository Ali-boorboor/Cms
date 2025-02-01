import Dashboard from "../Components/Templates/Dashboard";
import { memo, useEffect } from "react";
import { AxiosInstanceApp } from "../Services/AxiosInstanceApp";
import {
  GetAllBannedUsersResponseType,
  GetAllCommentResponseType,
  GetAllCoursesResponseType,
  GetAllTicketResponseType,
  GetAllUserResponsesType,
} from "../Types/AxiosResponsesType/AxiosResponsesType";
import { useRecoilState } from "recoil";
import {
  AllComments,
  AllTickets,
  AllUsers,
  AllBannedUsers,
  AllCourses,
} from "../Contexts/RecoilAtoms";

const DashboardPage = memo(() => {
  const [allUsers, setAllUsers] = useRecoilState(AllUsers);
  const [allComments, setAllComments] = useRecoilState(AllComments);
  const [allTickets, setAllTickets] = useRecoilState(AllTickets);
  const [allBannedUsers, setAllBannedUsers] = useRecoilState(AllBannedUsers);
  const [allCourses, setAllCourses] = useRecoilState(AllCourses);

  useEffect(() => {
    document.title = "CMS - PANEL | DASHBOARD";

    if (allUsers.length === 0 || !allUsers[0]?._id) {
      AxiosInstanceApp.get("/user/get-all", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res: GetAllUserResponsesType) => setAllUsers(res.data?.result));
    }

    if (allComments.length === 0 || !allComments[0]?._id) {
      AxiosInstanceApp.get("/comment/get-all", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res: GetAllCommentResponseType) => setAllComments(res.data?.result));
    }

    if (allTickets.length === 0 || !allTickets[0]?._id) {
      AxiosInstanceApp.get("/off-ticket/get-all", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res: GetAllTicketResponseType) => setAllTickets(res.data?.result));
    }

    if (allBannedUsers.length === 0 || !allBannedUsers[0]?._id) {
      AxiosInstanceApp.get("/banned-user/get-all", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res: GetAllBannedUsersResponseType) => setAllBannedUsers(res.data?.result));
    }

    if (allCourses.length === 0 || !allCourses[0]?._id) {
      AxiosInstanceApp.get("/course/get-all", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res: GetAllCoursesResponseType) => setAllCourses(res.data?.result));
    }
  }, []);

  return <Dashboard />;
});

export default DashboardPage;
