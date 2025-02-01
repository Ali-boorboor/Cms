import Table from "../Tables/Table";
import BannedUserRemoveModal from "../RemoveModals/BannedUserRemoveModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { memo } from "react";
import {
  AllBannedUsers,
  isRemoveModalBanUser,
  mainUserBannedIDToRemove,
} from "../../../Contexts/RecoilAtoms";

const BannedUsersTable = memo(() => {
  const allBannedUsers = useRecoilValue(AllBannedUsers);
  const [isRemoveModal, setIsRemoveModal] = useRecoilState(isRemoveModalBanUser);
  const [, setMainBannedUserRemove] = useRecoilState(mainUserBannedIDToRemove);

  return (
    <>
      <Table th1="User Email" th2="Email Type" th3="Banned At" th4="Remove">
        {allBannedUsers
          .slice()
          .reverse()
          .map((user) => (
            <tr
              className="bg-primaryColor bg-opacity-60 border-b dark:bg-opacity-100 dark:border-zinc-700 hover:bg-opacity-70 dark:hover:bg-opacity-70"
              key={user?._id}
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 dark:focus:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-6 py-4">{user?.email}</td>
              <td className="px-6 py-4">Gmail</td>
              <td className="px-6 py-4">{user?.created_At.toLocaleString().slice(0, 25)}</td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  className="bg-red-500 dark:bg-red-600 p-1 rounded-md text-white hover:text-red-500 hover:bg-white"
                  onClick={() => {
                    setIsRemoveModal(true);
                    setMainBannedUserRemove(user._id);
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
      </Table>
      {isRemoveModal && <BannedUserRemoveModal bgOpacity="bg-opacity-50" />}
    </>
  );
});

export default BannedUsersTable;
