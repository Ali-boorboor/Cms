import DeleteFormModal from "../../Molecules/DeleteFormModal";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import { AllBannedUsers, mainUserBannedIDToRemove } from "../../../Contexts/RecoilAtoms";
import { GetAllBannedUsersResponseType } from "../../../Types/AxiosResponsesType/AxiosResponsesType";

const BannedUserRemoveModal = memo(({ bgOpacity }: any) => {
  const mainUserBannedRemove = useRecoilValue(mainUserBannedIDToRemove);
  const [, setAllBannedUsers] = useRecoilState(AllBannedUsers);

  const onSubmitFunction = () => {
    AxiosInstanceApp.delete(`/ban/${mainUserBannedRemove}`).then(() => {
      AxiosInstanceApp.get("/ban").then((res: GetAllBannedUsersResponseType) =>
        setAllBannedUsers(res.data.data)
      );
    });
  };

  return (
    <DeleteFormModal
      title="Banned User"
      onSubmitFunction={onSubmitFunction}
      bgOpacity={bgOpacity}
    />
  );
});

export default BannedUserRemoveModal;
