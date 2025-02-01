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

    if (allTickets.length === 0 || !allTickets[0]?._id) {
      AxiosInstanceApp.get("/off-ticket/get-all", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res: GetAllTicketResponseType) => setAllTickets(res.data?.result));
    }
  }, []);

  return <OffTickets />;
});

export default OffTicketsPage;
