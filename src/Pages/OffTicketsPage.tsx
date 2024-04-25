import OffTickets from "../Components/Templates/OffTickets";
import { memo, useEffect } from "react";
import { AllTickets } from "../Contexts/RecoilAtoms";
import { useRecoilState } from "recoil";
import { AxiosInstanceApp } from "../Services/AxiosInstanceApp";
import { GetAllTicketResponseType } from "../Types/AxiosResponsesType/AxiosResponsesType";

const OffTicketsPage = memo(() => {
  const [allTickets, setAllTickets] = useRecoilState(AllTickets);

  useEffect(() => {
    document.title = "CMS - PANEL | OFF-TICKETS";

    allTickets[0].off_id === 0 &&
      AxiosInstanceApp.get("off-ticket").then((res: GetAllTicketResponseType) =>
        setAllTickets(res.data.data)
      );
  }, []);

  return <OffTickets />;
});

export default OffTicketsPage;
