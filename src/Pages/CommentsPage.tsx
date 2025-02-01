import Comments from "../Components/Templates/Comments";
import { memo, useEffect } from "react";
import { AllComments } from "../Contexts/RecoilAtoms";
import { useRecoilState } from "recoil";
import { AxiosInstanceApp } from "../Services/AxiosInstanceApp";
import { GetAllCommentResponseType } from "../Types/AxiosResponsesType/AxiosResponsesType";

const commentsPage = memo(() => {
  const [allComments, setAllComments] = useRecoilState(AllComments);

  useEffect(() => {
    document.title = "CMS - PANEL | COMMENTS";

    if (allComments.length === 0 || !allComments[0]?._id) {
      AxiosInstanceApp.get("/comment/get-all", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res: GetAllCommentResponseType) => setAllComments(res.data?.result));
    }
  }, []);

  return <Comments />;
});

export default commentsPage;
