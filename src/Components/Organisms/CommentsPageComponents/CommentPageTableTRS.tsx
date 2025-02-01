import CommentRemoveModal from "../RemoveModals/CommentRemoveModal";
import { isRemoveModalComment, mainCommentIDToRemove } from "../../../Contexts/RecoilAtoms";
import { useRecoilState } from "recoil";
import { memo } from "react";

const CommentPageTableTRS = memo((comment: any) => {
  const [isRemoveModal, setIsRemoveModal] = useRecoilState(isRemoveModalComment);
  const [, setMainCommentRemove] = useRecoilState(mainCommentIDToRemove);

  return (
    <>
      <tr
        key={comment._id}
        className="odd:bg-primaryColor odd:bg-opacity-60 odd:border-b odd:dark:bg-opacity-100 odd:dark:border-zinc-700 odd:hover:bg-opacity-70 odd:dark:hover:bg-opacity-70 even:bg-zinc-400 even:dark:bg-secondaryColor even:bg-opacity-100 even:border-b even:dark:bg-opacity-100 even:dark:border-zinc-700 even:hover:bg-opacity-70 even:dark:hover:bg-opacity-70"
      >
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 dark:focus:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
            />
            <label htmlFor="checkbox-table-search-1" className="sr-only">
              checkbox
            </label>
          </div>
        </td>
        <th scope="row" className="px-6 py-4 text-black whitespace-nowrap dark:text-white">
          <div className="text-base font-semibold">{comment?.commenter?.username}</div>
        </th>
        <td className="px-6 py-4" title={comment.body}>
          {comment.body.slice(0, 40)}...
        </td>
        <td className="px-6 py-4">
          <img
            src={comment?.course?.cover}
            alt="Course-Cover"
            className="w-40 h-20 object-cover rounded-full border-2 dark:border-white border-black"
          />
        </td>
        <td className="px-6 py-4">
          {new Date(comment?.created_At).toLocaleDateString("fa-IR-u-nu-latn")}
        </td>
        <td className="px-6 py-4">
          <button
            type="button"
            className="bg-red-500 dark:bg-red-600 p-1 rounded-md text-white hover:text-red-500 hover:bg-white"
            onClick={() => {
              setIsRemoveModal(true);
              setMainCommentRemove(comment._id);
            }}
          >
            Remove
          </button>
        </td>
      </tr>
      {isRemoveModal && <CommentRemoveModal bgOpacity="bg-opacity-50" />}
    </>
  );
});

export default CommentPageTableTRS;
