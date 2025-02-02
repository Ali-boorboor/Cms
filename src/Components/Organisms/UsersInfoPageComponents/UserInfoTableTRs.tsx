import UserRemoveModal from "../RemoveModals/UserRemoveModal";
import { useNavigate } from "react-router";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { isRemoveModalUser, mainUserIDToRemove } from "../../../Contexts/RecoilAtoms";

const UserInfoTableTRs = memo((user: any) => {
  const [isRemoveModal, setIsRemoveModal] = useRecoilState(isRemoveModalUser);
  const [, setMainUserRemove] = useRecoilState(mainUserIDToRemove);
  const navigate = useNavigate();

  return (
    <>
      <tr className="bg-primaryColor bg-opacity-60 border-b dark:bg-opacity-100 dark:border-zinc-700 hover:bg-opacity-70 dark:hover:bg-opacity-70">
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
        <th scope="row" className="px-6 py-4 text-black whitespace-nowrap dark:text-white">
          <div className="text-base font-semibold">{user?.username}</div>
        </th>
        <td className="px-6 py-4">{user?.email}</td>
        <td className="px-6 py-4">
          {new Date(user?.created_At).toLocaleDateString("fa-IR-u-nu-latn")}
        </td>
        <td className="px-6 py-4">
          <button
            type="button"
            className="bg-red-500 dark:bg-red-600 p-1 rounded-md text-white hover:text-red-500 hover:bg-white"
            onClick={() => {
              setIsRemoveModal(true);
              setMainUserRemove(user?._id);
            }}
          >
            Remove
          </button>
        </td>
        <td className="px-6 py-4">
          <button
            type="button"
            className="font-medium bg-blue-500 dark:bg-blue-600 text-white rounded-md p-1 hover:bg-white hover:text-blue-500"
            onClick={() => navigate(`/user-info/${user?._id}`)}
          >
            More Infos
          </button>
        </td>
      </tr>
      {isRemoveModal && <UserRemoveModal bgOpacity="bg-opacity-10" />}
    </>
  );
});

export default UserInfoTableTRs;
