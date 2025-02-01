import DeleteFormModal from "../../Molecules/DeleteFormModal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AllComments,
  AllUsers,
  isRemoveModalUser,
  mainUserIDToRemove,
} from "../../../Contexts/RecoilAtoms";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import { memo } from "react";
import {
  GetAllCommentResponseType,
  GetAllUserResponsesType,
} from "../../../Types/AxiosResponsesType/AxiosResponsesType";

const UserRemoveModal = memo(({ bgOpacity }: any) => {
  const mainUserRemove = useRecoilValue(mainUserIDToRemove);
  const [, setAllUsers] = useRecoilState(AllUsers);
  const [, setIsRemoveModal] = useRecoilState(isRemoveModalUser);
  const [, setAllComments] = useRecoilState(AllComments);

  const onSubmitFunction = () => {
    AxiosInstanceApp.delete("/user", {
      headers: {
        Authorization: localStorage.getItem("token"),
        userid: mainUserRemove,
      },
    })
      .then(() => {
        AxiosInstanceApp.get("/user/get-all", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }).then((res: GetAllUserResponsesType) => setAllUsers(res.data?.result));
      })
      .then(() => {
        AxiosInstanceApp.get("/comment/get-all", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }).then((res: GetAllCommentResponseType) => setAllComments(res.data?.result));
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
