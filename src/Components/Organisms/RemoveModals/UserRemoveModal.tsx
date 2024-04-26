import DeleteFormModal from "../../Molecules/DeleteFormModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { AllUsers, isRemoveModalUser, mainUserIDToRemove } from "../../../Contexts/RecoilAtoms";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import { memo } from "react";
import { GetAllUserResponsesType } from "../../../Types/AxiosResponsesType/AxiosResponsesType";

const UserRemoveModal = memo(({ bgOpacity }: any) => {
  const mainUserRemove = useRecoilValue(mainUserIDToRemove);
  const [, setAllUsers] = useRecoilState(AllUsers);
  const [, setIsRemoveModal] = useRecoilState(isRemoveModalUser);

  const onSubmitFunction = () => {
    AxiosInstanceApp.delete(`/user/${mainUserRemove}`).then(() => {
      AxiosInstanceApp.get("/users").then((res: GetAllUserResponsesType) =>
        setAllUsers(res.data.data)
      );
    });
  };

  const onCloseFunction = () => setIsRemoveModal(false);

  return (
    <DeleteFormModal
      title="User"
      onSubmitFunction={onSubmitFunction}
      bgOpacity={bgOpacity}
      onCloseFunction={onCloseFunction}
    />
  );
});

export default UserRemoveModal;
