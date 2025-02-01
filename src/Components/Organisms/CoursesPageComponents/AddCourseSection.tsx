import Toast from "../../Molecules/Toast";
import React, { memo, useEffect } from "react";
import { GiTeacher } from "react-icons/gi";
import { FaBookMedical } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { MdTimer } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";
import { useRecoilState } from "recoil";
import {
  isResetModal,
  isSuccessModal,
  isErrorModal,
  AddCourseNameInput,
  AddCourseNameInputValidator,
  AddCourseTeacherInput,
  AddCoursePriceInputValidator,
  AddCoursePriceInput,
  AllCourses,
  AddCourseDurationInput,
  AddCourseDurationInputValidator,
  AddCourseCoverUploader,
  AddCourseCoverUploaderValidator,
  AddCourseTeacherInputValidator,
} from "../../../Contexts/RecoilAtoms";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import { GetAllCoursesResponseType } from "../../../Types/AxiosResponsesType/AxiosResponsesType";
import { BiSolidError } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { MdError } from "react-icons/md";

const AddCourseSection = memo(() => {
  const [resetFormModal, setResetFormModal] = useRecoilState(isResetModal);
  const [submitAddFormModal, setSubmitAddFormModal] = useRecoilState(isSuccessModal);
  const [errorFormModal, setErrorFormModal] = useRecoilState(isErrorModal);
  const [addCourseNameInput, setAddCourseNameInput] = useRecoilState(AddCourseNameInput);
  const [courseNameInputValidator, setCourseNameInputValidator] = useRecoilState(
    AddCourseNameInputValidator
  );
  const [courseTeacherInput, setCourseTeacherInput] = useRecoilState(AddCourseTeacherInput);
  const [courseTeacherInputValidator, setCourseTeacherInputValidator] = useRecoilState(
    AddCourseTeacherInputValidator
  );
  const [coursePriceInput, setCoursePriceInput] = useRecoilState(AddCoursePriceInput);
  const [coursePriceInputValidator, setCoursePriceInputValidator] = useRecoilState(
    AddCoursePriceInputValidator
  );
  const [courseDurationInput, setCourseDurationInput] = useRecoilState(AddCourseDurationInput);
  const [courseDurationInputValidator, setCourseDurationInputValidator] = useRecoilState(
    AddCourseDurationInputValidator
  );
  const [courseCoverUploader, setCourseCoverUploader] = useRecoilState(AddCourseCoverUploader);
  const [courseCoverUploaderValidator, setCourseCoverUploaderValidator] = useRecoilState(
    AddCourseCoverUploaderValidator
  );
  const [, setAllCourses] = useRecoilState(AllCourses);

  useEffect(() => {
    addCourseNameInput.trim().length >= 3
      ? setCourseNameInputValidator(true)
      : setCourseNameInputValidator(false);
    courseTeacherInput.trim().length >= 3
      ? setCourseTeacherInputValidator(true)
      : setCourseTeacherInputValidator(false);
    coursePriceInput >= 0
      ? setCoursePriceInputValidator(true)
      : setCoursePriceInputValidator(false);
    courseDurationInput.trim()
      ? setCourseDurationInputValidator(true)
      : setCourseDurationInputValidator(false);
    courseCoverUploader
      ? setCourseCoverUploaderValidator(true)
      : setCourseCoverUploaderValidator(false);
  }, [
    addCourseNameInput,
    courseTeacherInput,
    coursePriceInput,
    courseDurationInput,
    courseCoverUploader,
  ]);

  const addCourseHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      AddCourseNameInputValidator &&
      courseTeacherInputValidator &&
      coursePriceInputValidator &&
      courseCoverUploaderValidator &&
      courseDurationInputValidator
    ) {
      const bodyFormData: any = new FormData();
      bodyFormData.append("name", addCourseNameInput);
      bodyFormData.append("teacher", courseTeacherInput);
      bodyFormData.append("price", coursePriceInput);
      bodyFormData.append("duration", courseDurationInput);
      bodyFormData.append("cover", courseCoverUploader);

      AxiosInstanceApp({
        method: "post",
        url: "/course",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then(() => {
          setSubmitAddFormModal(true);
          AxiosInstanceApp.get("/course/get-all", {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }).then((res: GetAllCoursesResponseType) => setAllCourses(res.data?.result));
          setAddCourseNameInput("");
          setCourseTeacherInput("");
          setCourseCoverUploader(null);
          setCourseDurationInput("");
          setCoursePriceInput(0);
        })
        .catch(() => {
          setErrorFormModal(true);
        });
    } else {
      setErrorFormModal(true);
    }
  };
  const resetFormHandler = () => {
    setResetFormModal(true);
    setAddCourseNameInput("");
    setCourseTeacherInput("");
    setCourseCoverUploader(null);
    setCourseDurationInput("");
    setCoursePriceInput(0);
  };

  return (
    <>
      <form
        className="flex flex-col rounded-lg overflow-hidden bg-zinc-400 dark:bg-secondaryColor pb-4"
        onSubmit={(e) => addCourseHandler(e)}
      >
        <h1 className="flex items-center gap-2 md:flex justify-center text-xl font-bold p-2 text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
          Add New Course
          <FaBookMedical className="w-5 h-5" />
        </h1>
        <div className="flex flex-col justify-center items-center gap-2 p-2">
          <div className="flex items-center justify-center gap-4 md:flex-nowrap flex-wrap p-2">
            <label className="max-w-96 w-full min-w-40 flex gap-2 items-center justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
              <MdOutlineDriveFileRenameOutline className="w-5 h-5 dark:text-white text-secondaryColor" />
              <input
                type="text"
                placeholder="Course Name"
                value={addCourseNameInput}
                onChange={(e) => setAddCourseNameInput(e.target.value)}
                className="w-full outline-none bg-transparent font-bold text-secondaryColor dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
              />

              <button type="button" className="bg-white rounded-full p-1">
                {courseNameInputValidator ? (
                  <TiTick className="w-6 h-6 text-green-600" />
                ) : (
                  <BiSolidError className="w-6 h-6 text-red-600" />
                )}
              </button>
            </label>
            <label className="max-w-96 w-full min-w-40 flex gap-2 items-center justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
              <GiTeacher className="w-5 h-5 dark:text-white text-secondaryColor" />
              <input
                type="text"
                placeholder="Course Teacher"
                value={courseTeacherInput}
                onChange={(e) => setCourseTeacherInput(e.target.value)}
                className="w-full outline-none bg-transparent font-bold text-secondaryColor dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
              />
              <button type="button" className="bg-white rounded-full p-1">
                {courseTeacherInputValidator ? (
                  <TiTick className="w-6 h-6 text-green-600" />
                ) : (
                  <BiSolidError className="w-6 h-6 text-red-600" />
                )}
              </button>
            </label>
          </div>
          <div className="flex items-center justify-center gap-4 md:flex-nowrap flex-wrap p-2">
            <label className="max-w-96 w-full min-w-40 flex gap-2 items-center justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
              <FaMoneyBillAlt className="w-5 h-5 dark:text-white text-secondaryColor" />
              <input
                type="number"
                placeholder="Course Price"
                value={coursePriceInput}
                onChange={(e) => setCoursePriceInput(+e.target.value)}
                className="w-full outline-none bg-transparent font-bold text-secondaryColor dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
              />
              <button type="button" className="bg-white rounded-full p-1">
                {coursePriceInputValidator ? (
                  <TiTick className="w-6 h-6 text-green-600" />
                ) : (
                  <BiSolidError className="w-6 h-6 text-red-600" />
                )}
              </button>
            </label>
            <label className="max-w-96 w-full min-w-40 flex gap-2 items-center justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
              <MdTimer className="w-5 h-5 dark:text-white text-secondaryColor" />
              <input
                type="text"
                placeholder="Course Duration"
                value={courseDurationInput}
                onChange={(e) => setCourseDurationInput(e.target.value)}
                className="w-full outline-none bg-transparent font-bold text-secondaryColor dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
              />
              <button type="button" className="bg-white rounded-full p-1">
                {courseDurationInputValidator ? (
                  <TiTick className="w-6 h-6 text-green-600" />
                ) : (
                  <BiSolidError className="w-6 h-6 text-red-600" />
                )}
              </button>
            </label>
          </div>
        </div>
        <div className="p-2 flex-wrap gap-4 flex justify-center items-center">
          <label
            htmlFor="Uploader"
            className={`text-secondaryColor cursor-pointer p-6 rounded-lg border dark:border-white border-black min-w-40 w-full max-w-80 h-20 flex items-center justify-center gap-2 ${
              courseCoverUploaderValidator ? "bg-green-600" : "bg-primaryColor"
            }`}
          >
            <FaFileImage className="w-5 h-5" />
            {courseCoverUploaderValidator ? (
              <button type="button" className="bg-white rounded-full p-1">
                <TiTick className="w-6 h-6 text-green-600" />
              </button>
            ) : (
              "Choose Image File"
            )}
          </label>
          {/* <button
            className="flex h-20 items-center justify-center gap-2 rounded-lg bg-zinc-500 text-white p-2 w-40 hover:scale-105 border border-black dark:border-white"
            type="button"
            onClick={() => setCourseCoverUploader(null)}
          >
            Clear Uploader
            <FaRegTrashAlt />
          </button> */}
        </div>
        <input
          type="file"
          id="Uploader"
          hidden
          onChange={(e: any) => {
            if (e.target.files && e.target.files.length > 0) {
              setCourseCoverUploader(e.target.files[0]);
            }
          }}
        />
        <div className="flex flex-col justify-center items-center gap-4 mt-4">
          <button
            type="reset"
            onClick={() => resetFormHandler()}
            className="flex items-center justify-center gap-2 rounded-lg bg-zinc-500 text-white p-2 w-40 hover:scale-105 border border-black dark:border-white"
          >
            Reset
            <GrPowerReset className="w-5 h-5 text-white" />
          </button>
          <button
            type="submit"
            className={`flex items-center justify-center gap-2 rounded-lg p-2 w-40 text-white hover:scale-105 border border-black dark:border-white ${
              AddCourseNameInputValidator &&
              courseTeacherInputValidator &&
              coursePriceInputValidator &&
              courseCoverUploaderValidator &&
              courseDurationInputValidator
                ? "bg-green-600"
                : "bg-red-600"
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
      {submitAddFormModal && (
        <Toast
          icon={<TiTick className="w-5 h-5 text-green-600" />}
          title="Course Created Successfully"
        />
      )}
      {errorFormModal && (
        <Toast
          icon={<MdError className="w-5 h-5 text-red-600" />}
          title="Failed To Create Course"
        />
      )}
    </>
  );
});

export default AddCourseSection;
