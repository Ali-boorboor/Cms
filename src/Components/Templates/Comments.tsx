import CommentPageTableTRS from "../../Components/Organisms/CommentsPageComponents/CommentPageTableTRS";
import CommentsPageTable from "../../Components/Organisms/Tables/CommentsPageTable";
import Alert from "../../Components/Atoms/Alert";
import { memo } from "react";
import { AllComments } from "../../Contexts/RecoilAtoms";
import { useRecoilState } from "recoil";
import { FaComments } from "react-icons/fa";
import AddCommentSection from "../Organisms/CommentsPageComponents/AddCommentSection";

const Comments = memo(() => {
  const [allComments] = useRecoilState(AllComments);

  return (
    <>
      <main className="flex flex-col m-auto gap-4 p-4 lg:w-full md:w-[34rem] sm:w-80 w-72">
        <AddCommentSection />
        {!allComments[0]?._id ? (
          <Alert text="Found No Comment" />
        ) : (
          <>
            <section className="flex flex-col">
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
                  <CommentPageTableTRS key={comment?._id} {...comment} />
                ))}
              </CommentsPageTable>
            </section>
          </>
        )}
      </main>
    </>
  );
});

export default Comments;
