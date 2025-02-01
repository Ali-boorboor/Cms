import UserInfoTable from "../../Components/Organisms/UsersInfoPageComponents/UserInfoTable";
import AddUserForm from "../Organisms/UsersInfoPageComponents/AddUserForm";
import Alert from "../../Components/Atoms/Alert";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AllUsers, UserInfoSearchInput, UserInfoSortFilter } from "../../Contexts/RecoilAtoms";
import { useNavigate } from "react-router";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";

const UsersInfo = memo(() => {
  const [searchInput, setSearchInput] = useRecoilState(UserInfoSearchInput);
  const [userInfoSortFilter, setUserInfoSortFilter] = useRecoilState(UserInfoSortFilter);
  const allUsers = useRecoilValue(AllUsers);
  const navigate = useNavigate();

  const searchUserHandler = () => {
    if (searchInput.length) {
      const searchUserResult = allUsers.filter(
        (user) => user?.username.toLowerCase() === searchInput.toLowerCase()
      );
      navigate(`/user-info/${searchUserResult[0]?._id}`);
    }
  };

  return (
    <main className="flex flex-col m-auto gap-4 p-4 lg:w-full md:w-[34rem] sm:w-80 w-72">
      <AddUserForm />
      {allUsers.length === 0 || !allUsers[0]._id ? (
        <Alert text="Found No User" />
      ) : (
        <section className="flex flex-col">
          <div className="flex gap-4 items-center justify-between rounded-tl-lg rounded-tr-lg bg-zinc-400 dark:bg-secondaryColor px-8 p-2 border-b border-white dark:border-black">
            <h2 className="hidden md:flex justify-center items-center basis-3/5 gap-2 text-xl font-bold p-2 rounded-lg text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
              {`All Users (${allUsers.length})`}
              <PiUsersThreeFill className="w-6 h-6" />
            </h2>
            <div className="flex justify-end items-center gap-6 basis-2/5">
              <button
                type="button"
                className="bg-secondaryColor text-white dark:bg-primaryColor rounded-full p-2 border-2 border-primaryColor dark:border-trinityColor"
                onClick={() => setUserInfoSortFilter(!userInfoSortFilter)}
              >
                {userInfoSortFilter ? (
                  <FaSortAmountDown className="w-5 h-5" />
                ) : (
                  <FaSortAmountUpAlt className="w-5 h-5" />
                )}
              </button>
              <label className="relative flex items-center gap-2 w-32 sm:w-40 md:w-60 justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
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
                  <ul className="flex flex-col gap-2 text-center p-4 drop-shadow-lg rounded-lg absolute top-8 right-0 left-0 dark:bg-secondaryColor bg-primaryColor">
                    {allUsers
                      .filter((record) =>
                        record?.username.toUpperCase().includes(searchInput.toUpperCase())
                      )
                      .map((user) => (
                        <li
                          className="w-full p-2 rounded-lg cursor-pointer dark:text-white text-secondaryColor dark:hover:bg-white dark:hover:text-secondaryColor hover:bg-secondaryColor hover:text-white"
                          key={user?._id}
                          onClick={() => {
                            setSearchInput(user?.username);
                            navigate(`/user-info/${user?._id}`);
                          }}
                        >
                          {user?.username}
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
