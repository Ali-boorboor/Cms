import ReactDOM from "react-dom";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { isRemoveModalForm } from "../../Contexts/RecoilAtoms";

const DeleteFormModal = memo(({ title, onSubmitFunction, bgOpacity }: any) => {
  const [, setIsRemoveModal] = useRecoilState(isRemoveModalForm);

  return ReactDOM.createPortal(
    <>
      <section
        className={`w-full h-full flex justify-center items-center bg-black ${bgOpacity} fixed right-0 left-0 top-0 bottom-0 z-50`}
      >
        <form
          className="flex relative flex-col items-center justify-center gap-4 ring ring-secondaryColor dark:ring-white bg-zinc-400 dark:bg-secondaryColor p-6 drop-shadow-lg rounded-lg"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitFunction();
            setIsRemoveModal(false);
          }}
        >
          <p className="text-xl font-bold dark:bg-zinc-400 bg-secondaryColor p-2 rounded-lg text-white ring ring-secondaryColor dark:ring-white">{`Are You Sure About Removing This ${title} ?`}</p>
          <div className="flex w-full gap-4 items-center justify-center">
            <button
              type="submit"
              className="bg-green-600 text-white rounded-lg p-2 text-center basis-1/2 ring dark:ring-white ring-secondaryColor hover:scale-95"
            >
              YES
            </button>
            <button
              type="button"
              className="bg-red-600 text-white rounded-lg p-2 text-center basis-1/2 ring dark:ring-white ring-secondaryColor hover:scale-95"
              onClick={() => setIsRemoveModal(false)}
            >
              NO
            </button>
          </div>
        </form>
      </section>
    </>,
    document.getElementById("modals-wrapper")!
  );
});

export default DeleteFormModal;
