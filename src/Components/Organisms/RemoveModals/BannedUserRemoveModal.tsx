import DeleteFormModal from "../../Molecules/DeleteFormModal";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import {
  AllBannedUsers,
  isRemoveModalBanUser,
  mainUserBannedIDToRemove,
} from "../../../Contexts/RecoilAtoms";
import { GetAllBannedUsersResponseType } from "../../../Types/AxiosResponsesType/AxiosResponsesType";

const BannedUserRemoveModal = memo(({ bgOpacity }: any) => {
  const [, setIsRemoveModal] = useRecoilState(isRemoveModalBanUser);
  const mainUserBannedRemove = useRecoilValue(mainUserBannedIDToRemove);
  const [, setAllBannedUsers] = useRecoilState(AllBannedUsers);

  const onSubmitFunction = () => {
    AxiosInstanceApp.delete(`/ban/${mainUserBannedRemove}`).then(() => {
      AxiosInstanceApp.get("/ban").then((res: GetAllBannedUsersResponseType) =>
        setAllBannedUsers(res.data.data)
      );
    });
  };

  const onCloseFunction = () => setIsRemoveModal(false);

  return (
    <DeleteFormModal
      title="Banned User"
      onSubmitFunction={onSubmitFunction}
      onCloseFunction={onCloseFunction}
      bgOpacity={bgOpacity}
    />
  );
});

export default BannedUserRemoveModal;
