import Table from "../Tables/Table";
import { UserTableType } from "../../../Types/OrganismsType/OrganismsType";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { AllUsers } from "../../../Contexts/RecoilAtoms";
import { useNavigate } from "react-router";

const UserTable: UserTableType = memo(() => {
  const allUsers = useRecoilState(AllUsers);
  const navigate = useNavigate();

  return (
    <>
      <Table th1="User Name" th2="User Email" th3="Remove User" th4="User Infos">
        {allUsers[0]
          .slice()
          .reverse()
          .slice(0, 3)
          .map((user) => (
            <tr
              className="bg-lightRed bg-opacity-60 border-b dark:bg-opacity-100 dark:border-zinc-700 hover:bg-opacity-70 dark:hover:bg-opacity-70"
              key={user.user_id}
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
              <th scope="row" className="px-6 py-4 text-black whitespace-nowrap dark:text-white">
                <div className="text-base font-semibold">{user.user_name}</div>
              </th>
              <td className="px-6 py-4">{user.user_email}</td>
              <td className="px-6 py-4">
                <button className="bg-red-500 dark:bg-red-600 p-1 rounded-md text-white hover:text-red-500 hover:bg-white">
                  Remove
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  className="font-medium bg-blue-500 dark:bg-blue-600 text-white rounded-md p-1 hover:bg-white hover:text-blue-500"
                  onClick={() => navigate(`/user-info/${user.user_id}`)}
                >
                  More Infos
                </button>
              </td>
            </tr>
          ))}
      </Table>
    </>
  );
});

export default UserTable;
