import DeleteFormModal from "../../Molecules/DeleteFormModal";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import { AllTickets, mainTicketIDToRemove } from "../../../Contexts/RecoilAtoms";
import { GetAllTicketResponseType } from "../../../Types/AxiosResponsesType/AxiosResponsesType";

const TicketRemoveModal = memo(({ bgOpacity }: any) => {
  const mainTicketRemove = useRecoilValue(mainTicketIDToRemove);
  const [, setAllTickets] = useRecoilState(AllTickets);

  const onSubmitFunction = () => {
    AxiosInstanceApp.delete(`/off-ticket/${mainTicketRemove}`).then(() => {
      AxiosInstanceApp.get("/off-ticket").then((res: GetAllTicketResponseType) =>
        setAllTickets(res.data.data)
      );
    });
  };

  return (
    <DeleteFormModal title="Ticket" onSubmitFunction={onSubmitFunction} bgOpacity={bgOpacity} />
  );
});

export default TicketRemoveModal;
