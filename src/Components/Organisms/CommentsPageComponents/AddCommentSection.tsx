import Toast from "../../Molecules/Toast";
import React, { memo, useEffect, useState } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { MdBookmarkAdd } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isResetModal,
  isSuccessModal,
  isErrorModal,
  AllCourses,
  AllComments,
} from "../../../Contexts/RecoilAtoms";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import { BiSolidError } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { MdError } from "react-icons/md";

const AddCommentSection = memo(() => {
  const [resetFormModal, setResetFormModal] = useRecoilState(isResetModal);
  const [submitFormModal, setSubmitFormModal] = useRecoilState(isSuccessModal);
  const [errorFormModal, setErrorFormModal] = useRecoilState(isErrorModal);

  const [addCommentCourseInput, setAddCommentCourseInput] = useState("");

  const [addCommentCourseValidator, setAddCommentCourseValidator] = useState(false);

  const [addCommentInput, setAddCommentInput] = useState("");

  const [addCommentValidator, setAddCommentValidator] = useState(false);

  const [, setAllComments] = useRecoilState(AllComments);
  const allCourses = useRecoilValue(AllCourses);

  useEffect(() => {
    addCommentInput.length > 0 ? setAddCommentValidator(true) : setAddCommentValidator(false);
    addCommentCourseInput.length > 1
      ? setAddCommentCourseValidator(true)
      : setAddCommentCourseValidator(false);
  }, [addCommentInput, addCommentCourseInput]);

  const addFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userID = localStorage.getItem("userID");

    if (addCommentCourseValidator && addCommentValidator) {
      AxiosInstanceApp.post(
        "/comment",
        {
          body: addCommentInput,
          course: addCommentCourseInput,
          commenter: userID,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
        .then(() => {
          setSubmitFormModal(true);
          AxiosInstanceApp.get("/comment/get-all", {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }).then((res: any) => setAllComments(res.data?.result));
          setAddCommentInput("");
          setAddCommentCourseInput("");
        })
        .catch(() => {
          setErrorFormModal(true);
        });
    } else {
      setErrorFormModal(true);
    }
  };

  const resetAddUserFormHandler = () => {
    setResetFormModal(true);
    setAddCommentInput("");
    setAddCommentCourseInput("");
  };

  return (
    <>
      <form
        className="flex flex-col rounded-lg overflow-hidden bg-zinc-400 dark:bg-secondaryColor pb-4"
        onSubmit={(e) => addFormSubmitHandler(e)}
      >
        <h1 className="flex items-center gap-2 md:flex justify-center text-xl font-bold p-2 text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
          Add New Comment
          <MdBookmarkAdd className="w-5 h-5" />
        </h1>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex items-center justify-center gap-6 md:flex-nowrap flex-wrap p-4">
            <label className="max-w-96 w-full min-w-40 flex gap-2 items-center justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
              <MdOutlineDriveFileRenameOutline className="w-5 h-5 dark:text-white text-secondaryColor" />
              <input
                type="text"
                placeholder="Comment..."
                value={addCommentInput}
                onChange={(e) => setAddCommentInput(e.target.value)}
                className="w-full outline-none bg-transparent font-bold text-secondaryColor dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
              />
              <button type="button" className="bg-white rounded-full p-1">
                {addCommentValidator ? (
                  <TiTick className="w-6 h-6 text-green-600" />
                ) : (
                  <BiSolidError className="w-6 h-6 text-red-600" />
                )}
              </button>
            </label>
          </div>
          <div className="px-4 w-full flex justify-center items-center">
            <select
              className={`max-w-96 w-full text-white min-w-40 flex gap-2 items-center justify-center ${
                addCommentCourseValidator ? "bg-green-600" : "bg-red-600"
              } bg-opacity-90 p-2 rounded-full border border-secondaryColor dark:border-white outline-none`}
              onChange={(e) => {
                setAddCommentCourseInput(e.target.value);
              }}
            >
              <option
                value=""
                className="w-full outline-none bg-transparent font-bold text-white text-base"
              >
                Please Choose
              </option>
              {allCourses.map((course) => (
                <option
                  key={course?._id}
                  className="w-full outline-none bg-transparent font-bold text-white text-base"
                  value={course?._id}
                >
                  {course?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 mt-4">
          <button
            type="reset"
            onClick={() => resetAddUserFormHandler()}
            className="flex items-center justify-center gap-2 rounded-lg bg-zinc-500 text-white p-2 w-40 hover:scale-105 border border-black dark:border-white"
          >
            Reset
            <GrPowerReset className="w-5 h-5 text-white" />
          </button>
          <button
            type="submit"
            className={`flex items-center justify-center gap-2 rounded-lg p-2 w-40 text-white hover:scale-105 border border-black dark:border-white ${
              addCommentCourseValidator && addCommentValidator ? "bg-green-600" : "bg-red-600"
            }`}
          >
            Submit
            <FaThumbsUp className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
      {resetFormModal && (
        <Toast
          icon={<GrPowerReset className="w-5 h-5 text-green-600" />}
          title="Form Reset Successfully"
        />
      )}
      {submitFormModal && (
        <Toast
          icon={<TiTick className="w-5 h-5 text-green-600" />}
          title="Comment Created Successfully"
        />
      )}
      {errorFormModal && (
        <Toast
          icon={<MdError className="w-5 h-5 text-red-600" />}
          title="Please Fill Out Fields Correctly"
        />
      )}
    </>
  );
});

export default AddCommentSection;
