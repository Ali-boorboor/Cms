import CoursesTable from "../../Components/Organisms/LandingPageComponenets/CoursesTable";
import BannedUsersTable from "../../Components/Organisms/LandingPageComponenets/BannedUserTable";
import CommentTable from "../../Components/Organisms/LandingPageComponenets/CommentTable";
import OffTicketTable from "../../Components/Organisms/LandingPageComponenets/OffTicketTable";
import UserTable from "../../Components/Organisms/LandingPageComponenets/UserTable";
import Alert from "../../Components/Atoms/Alert";
import { memo } from "react";
import { PiUsersFill } from "react-icons/pi";
import { FaComments } from "react-icons/fa";
import { GiTicket } from "react-icons/gi";
import { FaBan } from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";
import { useRecoilState } from "recoil";
import {
  AllComments,
  AllTickets,
  AllUsers,
  AllBannedUsers,
  AllCourses,
} from "../../Contexts/RecoilAtoms";

const Dashboard = memo(() => {
  const [allUsers] = useRecoilState(AllUsers);
  const [allComments] = useRecoilState(AllComments);
  const [allTickets] = useRecoilState(AllTickets);
  const [allBannedUsers] = useRecoilState(AllBannedUsers);
  const [allCourses] = useRecoilState(AllCourses);

  return (
    <>
      <main className="flex flex-col m-auto gap-4 p-4 lg:w-full md:w-4/5 w-80">
        {allUsers[0].user_id === 0 ? (
          <Alert text="Found No User" />
        ) : (
          <>
            <h3 className="flex justify-center items-center gap-2 text-xl font-bold p-2 rounded-lg text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
              Recently Added Users
              <PiUsersFill className="w-6 h-6" />
            </h3>
            <UserTable />
          </>
        )}
        {allCourses[0].course_id === 0 ? (
          <Alert text="Found No Course" />
        ) : (
          <>
            <h3 className="flex justify-center items-center gap-2 text-xl font-bold p-2 rounded-lg text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
              Recent Courses
              <GiBookmarklet className="w-6 h-6" />
            </h3>
            <CoursesTable />
          </>
        )}
        {allComments[0].comment_id === 0 ? (
          <Alert text="Found No Comment" />
        ) : (
          <>
            <h3 className="flex justify-center items-center gap-2 text-xl font-bold p-2 rounded-lg text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
              Recent Comments
              <FaComments className="w-6 h-6" />
            </h3>
            <CommentTable />
          </>
        )}
        {allTickets[0].off_id === 0 ? (
          <Alert text="Found No Ticket" />
        ) : (
          <>
            <h3 className="flex justify-center items-center gap-2 text-xl font-bold p-2 rounded-lg text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
              Recent Tickets
              <GiTicket className="w-6 h-6" />
            </h3>
            <OffTicketTable />
          </>
        )}
        {allBannedUsers[0].banned_id === 0 ? (
          <Alert text="Found No Banned User" />
        ) : (
          <>
            <h3 className="flex justify-center items-center gap-2 text-xl font-bold p-2 rounded-lg text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
              Recent Banned Users
              <FaBan className="w-6 h-6" />
            </h3>
            <BannedUsersTable />
          </>
        )}
      </main>
    </>
  );
});

export default Dashboard;
