import UserInfoTable from "../../Components/Organisms/UsersInfoPageComponents/UserInfoTable";
import AddUserForm from "../Organisms/UsersInfoPageComponents/AddUserForm";
import Alert from "../../Components/Atoms/Alert";
import { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  AllUsers,
  UserInfoSearchInput,
  UserInfoSortFilter,
  usersCount,
} from "../../Contexts/RecoilAtoms";
import { useNavigate } from "react-router";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";

const UsersInfo = memo(() => {
  const [allUsersCount, setAllUsersCount] = useRecoilState(usersCount);
  const [searchInput, setSearchInput] = useRecoilState(UserInfoSearchInput);
  const [userInfoSortFilter, setUserInfoSortFilter] = useRecoilState(UserInfoSortFilter);
  const [allUsers] = useRecoilState(AllUsers);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setAllUsersCount((prevCount) => prevCount + 1);
    }, 60);

    if (allUsersCount === allUsers.length) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [allUsersCount, allUsers]);

  const searchUserHandler = () => {
    if (searchInput.length) {
      const searchUserResult = allUsers.filter(
        (user) => user.user_name.toLowerCase() === searchInput.toLowerCase()
      );
      navigate(`/user-info/${searchUserResult[0].user_id}`);
    }
  };

  return (
    <main className="flex flex-col m-auto gap-4 p-4 lg:w-full md:w-[34rem] sm:w-80 w-72">
      <AddUserForm />
      {allUsers[0].user_id === 0 ? (
        <Alert text="Found No User" />
      ) : (
        <section className="flex flex-col">
          <div className="flex gap-4 items-center justify-between rounded-tl-lg rounded-tr-lg bg-zinc-400 dark:bg-lightBlack px-8 p-2 border-b border-white dark:border-black">
            <h2 className="hidden md:flex justify-center items-center basis-3/5 gap-2 text-xl font-bold p-2 rounded-lg text-lightBlack dark:text-black bg-lightRed bg-opacity-60 dark:bg-opacity-100">
              {`All Users (${allUsersCount})`}
              <PiUsersThreeFill className="w-6 h-6" />
            </h2>
            <div className="flex justify-end items-center gap-6 basis-2/5">
              <button
                className="bg-lightBlack text-white dark:bg-lightRed rounded-full p-2 border-2 border-lightRed dark:border-lightYellow"
                onClick={() => setUserInfoSortFilter(!userInfoSortFilter)}
              >
                {userInfoSortFilter ? (
                  <FaSortAmountDown className="w-5 h-5" />
                ) : (
                  <FaSortAmountUpAlt className="w-5 h-5" />
                )}
              </button>
              <label className="relative flex items-center gap-2 w-32 sm:w-40 md:w-60 justify-center bg-lightRed bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-lightBlack dark:border-white">
                <FcSearch className="w-5 h-5 cursor-pointer" onClick={() => searchUserHandler()} />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.code === "Enter" && searchUserHandler()}
                  className="w-full outline-none bg-transparent font-bold capitalize text-black dark:text-white text-base placeholder:text-gray-600 dark:placeholder:text-gray-300"
                  placeholder="Search User"
                />
                {searchInput.length > 0 && (
                  <ul className="flex flex-col gap-2 text-center p-4 drop-shadow-lg rounded-lg absolute top-8 right-0 left-0 dark:bg-lightBlack bg-lightRed">
                    {allUsers
                      .filter((record) =>
                        record.user_name.toUpperCase().includes(searchInput.toUpperCase())
                      )
                      .map((user) => (
                        <li
                          className="w-full p-2 rounded-lg cursor-pointer dark:text-white text-lightBlack dark:hover:bg-white dark:hover:text-lightBlack hover:bg-lightBlack hover:text-white"
                          key={user.user_id}
                          onClick={() => {
                            setSearchInput(user.user_name);
                            navigate(`/user-info/${user.user_id}`);
                          }}
                        >
                          {user.user_name}
                        </li>
                      ))}
                  </ul>
                )}
              </label>
            </div>
          </div>
          <UserInfoTable />
        </section>
      )}
    </main>
  );
});

export default UsersInfo;
