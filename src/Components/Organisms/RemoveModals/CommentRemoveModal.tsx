import DeleteFormModal from "../../Molecules/DeleteFormModal";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import {
  AllComments,
  isRemoveModalComment,
  mainCommentIDToRemove,
} from "../../../Contexts/RecoilAtoms";
import { GetAllCommentResponseType } from "../../../Types/AxiosResponsesType/AxiosResponsesType";

const CommentRemoveModal = memo(({ bgOpacity }: any) => {
  const mainCommentRemove = useRecoilValue(mainCommentIDToRemove);
  const [, setAllComments] = useRecoilState(AllComments);
  const [, setIsRemoveModal] = useRecoilState(isRemoveModalComment);

  const onSubmitFunction = () => {
    AxiosInstanceApp.delete("/comment", {
      headers: {
        Authorization: localStorage.getItem("token"),
        commentid: mainCommentRemove,
      },
    }).then(() => {
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
      title="Comment"
      onSubmitFunction={onSubmitFunction}
      bgOpacity={bgOpacity}
      onCloseFunction={onCloseFunction}
    />
  );
});

export default CommentRemoveModal;
