import BannedUsersTable from "../Organisms/BannedUsersPageComponents/BannedUsersTable";
import Alert from "../Atoms/Alert";
import { useRecoilState, useRecoilValue } from "recoil";
import { memo } from "react";
import {
  AllBannedUsers,
  bannedUsersSearchInput,
  bannedUsersSortFilter,
} from "../../Contexts/RecoilAtoms";
import { FcSearch } from "react-icons/fc";
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { FaUserLargeSlash } from "react-icons/fa6";

const BannedUsers = memo(() => {
  const allBannedUsers = useRecoilValue(AllBannedUsers);
  const [searchInput, setSearchInput] = useRecoilState(bannedUsersSearchInput);
  const [BannedUsersSortFilter, setBannedUsersSortFilter] = useRecoilState(bannedUsersSortFilter);

  return (
    <main>
      {allBannedUsers[0].banned_id === 0 ? (
        <Alert text="Found No Course" />
      ) : (
        <section className="flex flex-col">
          <div className="flex gap-4 items-center justify-between rounded-tl-lg rounded-tr-lg bg-zinc-400 dark:bg-secondaryColor px-8 p-2 border-b border-white dark:border-black">
            <h2 className="hidden md:flex justify-center items-center basis-3/5 gap-2 text-xl font-bold p-2 rounded-lg text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
              {`All Banned Users (${allBannedUsers.length})`}
              <FaUserLargeSlash className="w-6 h-6" />
            </h2>
            <div className="flex justify-end items-center gap-6 basis-2/5">
              <button
                className="bg-secondaryColor text-white dark:bg-primaryColor rounded-full p-2 border-2 border-primaryColor dark:border-trinityColor"
                onClick={() => setBannedUsersSortFilter(!BannedUsersSortFilter)}
              >
                {BannedUsersSortFilter ? (
                  <FaSortAmountDown className="w-5 h-5" />
                ) : (
                  <FaSortAmountUpAlt className="w-5 h-5" />
                )}
              </button>
              <label className="relative flex items-center gap-2 w-32 sm:w-40 md:w-60 justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
                <FcSearch className="w-5 h-5 cursor-pointer" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full outline-none bg-transparent font-bold capitalize text-black dark:text-white text-base placeholder:text-gray-600 dark:placeholder:text-gray-300"
                  placeholder="Search Course"
                />
                {searchInput.length > 0 && (
                  <ul className="flex flex-col gap-2 text-center p-4 drop-shadow-lg rounded-lg absolute top-8 right-0 left-0 dark:bg-secondaryColor bg-primaryColor">
                    {allBannedUsers
                      .filter((record) =>
                        record.user_email.toUpperCase().includes(searchInput.toUpperCase())
                      )
                      .map((user) => (
                        <li
                          className="w-full p-2 rounded-lg cursor-pointer dark:text-white text-secondaryColor dark:hover:bg-white dark:hover:text-secondaryColor hover:bg-secondaryColor hover:text-white"
                          key={user.banned_id}
                          onClick={() => setSearchInput(user.user_email)}
                        >
                          {user.user_email}
                        </li>
                      ))}
                  </ul>
                )}
              </label>
            </div>
          </div>
          <BannedUsersTable />
        </section>
      )}
    </main>
  );
});

export default BannedUsers;
