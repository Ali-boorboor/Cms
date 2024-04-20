import { memo } from "react";
import { PiUserFill } from "react-icons/pi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { OneUserInfo } from "../../Contexts/RecoilAtoms";
import { useRecoilState } from "recoil";

const UserInfo = memo(() => {
  const [oneUserInfo] = useRecoilState(OneUserInfo);

  return (
    <main className="flex flex-col justify-center items-center gap-4 py-12 px-4 rounded-tl-lg rounded-bl-lg bg-zinc-400 dark:bg-lightBlack drop-shadow-lg">
      <h1 className="text-2xl font-bold text-white dark:text-black bg-lightBlack dark:bg-lightRed p-2 rounded-lg w-full flex items-center justify-center gap-2">
        User Info
        <PiUserFill className="w-6 h-6" />
      </h1>
      <h3 className="bg-lightBlack py-4 px-2 dark:bg-lightRed w-full text-center text-white dark:text-black rounded-lg">
        <p className="text-xl font-bold flex gap-2 items-center justify-center">
          <MdOutlineDriveFileRenameOutline className="w-5 h-5" />
          User Name:
          <span className="font-bold text-2xl underline text-lightRed dark:text-lightYellow">
            {oneUserInfo[0].user_name}
          </span>
        </p>
        <p className="text-lg font-medium text-zinc-300 dark:text-zinc-800 flex gap-2 items-center justify-center">
          <MdEmail className="w-5 h-5" />
          User Email:
          <span className="font-bold underline text-xl text-lightRed dark:text-lightYellow">
            {oneUserInfo[0].user_email}
          </span>
        </p>
      </h3>
      <section className="flex flex-col gap-4 p-10 w-full bg-lightBlack dark:bg-lightRed rounded-lg">
        <div className="flex justify-between items-center gap-4 w-full flex-wrap">
          {oneUserInfo[0].user_courses && (
            <p className="text-white dark:text-black font-medium text-lg">{`User Courses: ${oneUserInfo[0].user_courses}`}</p>
          )}
          {oneUserInfo[0].updated_At && (
            <p className="text-white dark:text-black font-medium text-lg flex flex-wrap items-center gap-2 justify-center">
              User Prodile Updated At:
              <span className="bg-white text-lightBlack dark:bg-lightBlack dark:text-white p-2 rounded-full text-nowrap">
                {oneUserInfo[0].updated_At.toLocaleString().slice(0, 25)}
              </span>
            </p>
          )}
          {oneUserInfo[0].registered_At && (
            <p className="text-white dark:text-black font-medium text-lg flex flex-wrap items-center gap-2 justify-center">
              User Registered At:
              <span className="bg-white text-lightBlack dark:bg-lightBlack dark:text-white p-2 rounded-full text-nowrap">
                {oneUserInfo[0].registered_At.toLocaleString().slice(0, 25)}
              </span>
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center p-4 bg-white text-black dark:text-white dark:bg-lightBlack sm:w-64 w-40 m-auto rounded-full">
          <button className="text-base font-medium bg-red-500 p-2 rounded-lg hover:text-white dark:hover:text-red-500 dark:hover:bg-white hover:bg-lightBlack">
            Ban User
          </button>
          <button className="text-base font-medium bg-lightRed p-2 rounded-lg hover:text-white hover:bg-lightBlack dark:hover:bg-white dark:hover:text-lightRed">
            Remove User
          </button>
        </div>
      </section>
    </main>
  );
});

export default UserInfo;
