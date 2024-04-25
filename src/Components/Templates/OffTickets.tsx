import OffTicketsTableTRS from "../../Components/Organisms/OffTicketsPageComponents/OffTicketsTableTRS";
import AddTicketSection from "../Organisms/OffTicketsPageComponents/AddTicketSection";
import OffTicketsPageTable from "../../Components/Organisms/Tables/OffTicketsPageTable";
import { useRecoilState } from "recoil";
import { memo, useEffect } from "react";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { AllTickets, ticketsCount } from "../../Contexts/RecoilAtoms";

const OffTickets = memo(() => {
  const [allTicketsCount, setAllTicketsCount] = useRecoilState(ticketsCount);
  const [allTickets] = useRecoilState(AllTickets);

  useEffect(() => {
    const interval = setInterval(() => {
      setAllTicketsCount((prevCount) => prevCount + 1);
    }, 300);

    if (allTicketsCount === allTickets.length) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [allTicketsCount, allTickets]);

  return (
    <main className="flex flex-col m-auto gap-4 p-4 lg:w-full md:w-4/5 w-80">
      <AddTicketSection />
      <section>
        <h2 className="flex justify-center items-center gap-2 text-xl font-bold p-2 rounded-tl-lg rounded-tr-lg text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
          {`All Off-Tickets (${allTicketsCount})`}
          <BsTicketPerforatedFill className="w-6 h-6" />
        </h2>
        <OffTicketsPageTable
          th1="Ticket Code"
          th2="Ticket Quantity"
          th3="Ticket 4 Course"
          th4="Created At"
          th5="Remove Ticket"
        >
          {allTickets.map((ticket) => (
            <OffTicketsTableTRS key={ticket.off_id} {...ticket} />
          ))}
        </OffTicketsPageTable>
      </section>
    </main>
  );
});

export default OffTickets;
