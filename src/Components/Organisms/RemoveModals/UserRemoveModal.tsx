import DeleteFormModal from "../../Molecules/DeleteFormModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { AllUsers, mainUserIDToRemove } from "../../../Contexts/RecoilAtoms";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import { memo } from "react";
import { GetAllUserResponsesType } from "../../../Types/AxiosResponsesType/AxiosResponsesType";

const UserRemoveModal = memo(({ bgOpacity }: any) => {
  const mainUserRemove = useRecoilValue(mainUserIDToRemove);
  const [, setAllUsers] = useRecoilState(AllUsers);

  const onSubmitFunction = () => {
    AxiosInstanceApp.delete(`/user/${mainUserRemove}`).then(() => {
      AxiosInstanceApp.get("/users").then((res: GetAllUserResponsesType) =>
        setAllUsers(res.data.data)
      );
    });
  };

  return <DeleteFormModal title="User" onSubmitFunction={onSubmitFunction} bgOpacity={bgOpacity} />;
});

export default UserRemoveModal;
