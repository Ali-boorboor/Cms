import Landing from "../Components/Templates/Landing";
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

    if (allUsers[0].user_id === 0) {
      AxiosInstanceApp.get("/users").then((res: GetAllUserResponsesType) =>
        setAllUsers(res.data.data)
      );
    }

    if (allComments[0].comment_id === 0) {
      AxiosInstanceApp.get("/comments").then((res: GetAllCommentResponseType) =>
        setAllComments(res.data.data)
      );
    }

    if (allTickets[0].off_id === 0) {
      AxiosInstanceApp.get("off-ticket").then((res: GetAllTicketResponseType) =>
        setAllTickets(res.data.data)
      );
    }

    if (allBannedUsers[0].banned_id === 0) {
      AxiosInstanceApp.get("/ban").then((res: GetAllBannedUsersResponseType) =>
        setAllBannedUsers(res.data.data)
      );
    }
    if (allCourses[0].course_id === 0) {
      AxiosInstanceApp.get("/courses").then((res: GetAllCoursesResponseType) =>
        setAllCourses(res.data.data)
      );
    }
  }, []);

  return <Landing />;
});

export default DashboardPage;
