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
  const mainUserBannedRemove = useRecoilValue(mainUserBannedIDToRemove);
  const [, setIsRemoveModal] = useRecoilState(isRemoveModalBanUser);
  const [, setAllBannedUsers] = useRecoilState(AllBannedUsers);

  const onSubmitFunction = () => {
    AxiosInstanceApp.delete("/banned-user", {
      headers: {
        Authorization: localStorage.getItem("token"),
        banid: mainUserBannedRemove,
      },
    })
      .then(() => {
        AxiosInstanceApp.get("/banned-user/get-all", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }).then((res: GetAllBannedUsersResponseType) => setAllBannedUsers(res.data?.result));
      })
      .catch(() => {});
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
