import DeleteFormModal from "../Molecules/DeleteFormModal";
import { memo } from "react";
import { AxiosInstanceApp } from "../../Services/AxiosInstanceApp";
import { useRecoilState, useRecoilValue } from "recoil";
import { AllBannedUsers, AllUsers, mainUserInfoToBan } from "../../Contexts/RecoilAtoms";
import {
  GetAllBannedUsersResponseType,
  GetAllUserResponsesType,
} from "../../Types/AxiosResponsesType/AxiosResponsesType";

const BanModal = memo(({ bgOpacity }: any) => {
  const mainUserRemove = useRecoilValue(mainUserInfoToBan);
  const [, setAllUsers] = useRecoilState(AllUsers);
  const [, setAllBannedUsers] = useRecoilState(AllBannedUsers);

  const onSubmitFunction = () => {
    AxiosInstanceApp.post("/ban", {
      userName: mainUserRemove.user_name,
      userEmail: mainUserRemove.user_email,
    })
      .then(() => {
        AxiosInstanceApp.get("/ban").then((res: GetAllBannedUsersResponseType) =>
          setAllBannedUsers(res.data.data)
        );
      })
      .then(() => {
        AxiosInstanceApp.delete(`/user/${mainUserRemove.user_id}`).then(() => {
          AxiosInstanceApp.get("/users").then((res: GetAllUserResponsesType) =>
            setAllUsers(res.data.data)
          );
        });
      });
  };

  return (
    <DeleteFormModal
      title="User & Ban The User"
      onSubmitFunction={onSubmitFunction}
      bgOpacity={bgOpacity}
    />
  );
});

export default BanModal;
