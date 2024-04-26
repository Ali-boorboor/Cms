import DeleteFormModal from "../../Molecules/DeleteFormModal";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import { AllComments, mainCommentIDToRemove } from "../../../Contexts/RecoilAtoms";
import { GetAllCommentResponseType } from "../../../Types/AxiosResponsesType/AxiosResponsesType";

const CommentRemoveModal = memo(({ bgOpacity }: any) => {
  const mainCommentRemove = useRecoilValue(mainCommentIDToRemove);
  const [, setAllComments] = useRecoilState(AllComments);

  const onSubmitFunction = () => {
    AxiosInstanceApp.delete(`/comment/${mainCommentRemove}`).then(() => {
      AxiosInstanceApp.get("/comments").then((res: GetAllCommentResponseType) =>
        setAllComments(res.data.data)
      );
    });
  };

  return (
    <DeleteFormModal title="Comment" onSubmitFunction={onSubmitFunction} bgOpacity={bgOpacity} />
  );
});

export default CommentRemoveModal;
