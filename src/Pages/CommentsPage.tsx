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

    if (allComments[0].comment_id === 0) {
      AxiosInstanceApp.get("/comments").then((res: GetAllCommentResponseType) =>
        setAllComments(res.data.data)
      );
    }
  }, []);

  return <Comments />;
});

export default commentsPage;
