import CommentPageTableTRS from "../../Components/Organisms/CommentsPageComponents/CommentPageTableTRS";
import CommentsPageTable from "../../Components/Organisms/Tables/CommentsPageTable";
import Alert from "../../Components/Atoms/Alert";
import { memo } from "react";
import { AllComments } from "../../Contexts/RecoilAtoms";
import { useRecoilState } from "recoil";
import { FaComments } from "react-icons/fa";

const Comments = memo(() => {
  const [allComments] = useRecoilState(AllComments);

  return (
    <>
      {allComments[0].comment_id === 0 ? (
        <Alert text="Found No Comment" />
      ) : (
        <main className="flex flex-col m-auto gap-4 p-4 lg:w-full md:w-4/5 w-80">
          <section>
            <h3 className="flex justify-center items-center gap-2 text-xl font-bold p-2 rounded-tl-lg rounded-tr-lg text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
              All Comments
              <FaComments className="w-6 h-6" />
            </h3>
            <CommentsPageTable
              th1="Commenter Name"
              th2="Comment Body"
              th3="Commented 4 Course"
              th4="Commented At"
              th5="Remove Comment"
            >
              {allComments.map((comment) => (
                <CommentPageTableTRS key={comment.comment_id} {...comment} />
              ))}
            </CommentsPageTable>
          </section>
        </main>
      )}
    </>
  );
});

export default Comments;
