import { UsersPageTableType } from "../../../Types/OrganismsType/OrganismsType";
import { memo } from "react";

const UsersPageTable: UsersPageTableType = memo(
  ({ children, th1, th2, th3, th4, th5, th6, th7 }) => {
    return (
      <div className="overflow-x-auto shadow-md rounded-br-lg rounded-bl-lg">
        <table className="w-full text-sm text-left rtl:text-right text-zinc-700 dark:text-white">
          <thead className="text-xs text-zinc-700 uppercase bg-zinc-400 dark:bg-secondaryColor dark:text-zinc-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 dark:focus:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                {th1}
              </th>
              <th scope="col" className="px-6 py-3">
                {th2}
              </th>
              <th scope="col" className="px-6 py-3">
                {th3}
              </th>
              <th scope="col" className="px-6 py-3">
                {th4}
              </th>
              <th scope="col" className="px-6 py-3">
                {th5}
              </th>
              <th scope="col" className="px-6 py-3">
                {th6}
              </th>
              <th scope="col" className="px-6 py-3">
                {th7}
              </th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    );
  }
);

export default UsersPageTable;
