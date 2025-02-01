import Table from "../Tables/Table";
import TicketRemoveModal from "../RemoveModals/TicketRemoveModal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AllTickets,
  isRemoveModalTicket,
  mainTicketIDToRemove,
} from "../../../Contexts/RecoilAtoms";
import { memo } from "react";

const OffTicketTable = memo(() => {
  const allTickets = useRecoilValue(AllTickets);
  const [isRemoveModal, setIsRemoveModal] = useRecoilState(isRemoveModalTicket);
  const [, setMainTicketRemove] = useRecoilState(mainTicketIDToRemove);

  return (
    <>
      <Table th1="Ticket Code" th2="Ticket Quantity" th3="Created At" th4="Remove Ticket">
        {allTickets
          .slice()
          .reverse()
          .slice(0, 3)
          .map((ticket) => (
            <tr
              className="bg-primaryColor bg-opacity-60 border-b dark:bg-opacity-100 dark:border-zinc-700 hover:bg-opacity-70 dark:hover:bg-opacity-70"
              key={ticket?._id}
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
              <th scope="row" title={ticket?.code} className="px-6 py-4 text-black dark:text-white">
                <div className="text-base font-semibold w-40 text-ellipsis overflow-hidden whitespace-nowrap">
                  {ticket?.code}
                </div>
              </th>
              <td className="px-6 py-4">{ticket?.quantity}</td>
              <td className="px-6 py-4">
                {new Date(ticket?.created_At).toLocaleDateString("fa-IR-u-nu-latn")}
              </td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  className="bg-red-500 dark:bg-red-600 p-1 rounded-md text-white hover:text-red-500 hover:bg-white"
                  onClick={() => {
                    setIsRemoveModal(true);
                    setMainTicketRemove(ticket?._id);
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
      </Table>
      {isRemoveModal && <TicketRemoveModal bgOpacity="bg-opacity-50" />}
    </>
  );
});

export default OffTicketTable;
