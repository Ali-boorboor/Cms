import Toast from "./Toast";
import ReactDOM from "react-dom";
import { memo, useEffect } from "react";
import {
  AllCourses,
  EditCourseDurationInput,
  EditCourseNameInput,
  EditCourseOfferInput,
  EditCoursePriceInput,
  EditCourseTeacherInput,
  MainEditModalCourse,
  isCourseEditModal,
  isErrorModal,
  isResetModal,
  isSuccessModal,
} from "../../Contexts/RecoilAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { CgClose } from "react-icons/cg";
import { MdError, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { BsClockFill } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { AxiosInstanceApp } from "../../Services/AxiosInstanceApp";
import { GetAllCoursesResponseType } from "../../Types/AxiosResponsesType/AxiosResponsesType";
import { GrPowerReset } from "react-icons/gr";

const EditCourseModal = memo(() => {
  const [, setCourseEditModal] = useRecoilState(isCourseEditModal);
  const [, setAllCourses] = useRecoilState(AllCourses);
  const [courseName, setCourseName] = useRecoilState(EditCourseNameInput);
  const [courseTeacher, setCourseTeacher] = useRecoilState(EditCourseTeacherInput);
  const [coursePrice, setCoursePrice] = useRecoilState(EditCoursePriceInput);
  const [courseDuration, setCourseDuration] = useRecoilState(EditCourseDurationInput);
  const [courseOffer, setCourseOffer] = useRecoilState(EditCourseOfferInput);
  const [resetFormModal, setResetFormModal] = useRecoilState(isResetModal);
  const [submitAddFormModal, setSubmitAddFormModal] = useRecoilState(isSuccessModal);
  const [errorFormModal, setErrorFormModal] = useRecoilState(isErrorModal);
  const mainEditModalCourse = useRecoilValue(MainEditModalCourse);

  useEffect(() => {
    setCourseName(mainEditModalCourse?.name);
    setCourseTeacher(mainEditModalCourse?.teacher);
    setCoursePrice(mainEditModalCourse?.price);
    setCourseDuration(mainEditModalCourse?.duration);
    mainEditModalCourse?.offer ? setCourseOffer(mainEditModalCourse?.offer) : setCourseOffer(0);
  }, []);

  const submitNewCourseDatasHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (courseName && courseTeacher && courseDuration) {
      AxiosInstanceApp.put(
        "/course",
        {
          name: courseName,
          teacher: courseTeacher,
          price: coursePrice,
          duration: courseDuration,
          offer: courseOffer,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            courseid: mainEditModalCourse?._id,
          },
        }
      )
        .then(() => {
          AxiosInstanceApp.get("/course/get-all", {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }).then((res: GetAllCoursesResponseType) => setAllCourses(res.data?.result));
          setCourseEditModal(false);
          setSubmitAddFormModal(true);
        })
        .catch(() => {
          setErrorFormModal(true);
        });
    } else {
      setErrorFormModal(true);
    }
  };

  const resetFormHandler = () => {
    setCourseName("");
    setCourseTeacher("");
    setCoursePrice(0);
    setCourseDuration("");
    setCourseOffer(0);
    setResetFormModal(true);
  };

  return ReactDOM.createPortal(
    <>
      <section className="w-full h-full flex justify-center items-center bg-black bg-opacity-20 fixed right-0 left-0 top-0 bottom-0 z-50">
        <form
          className="flex relative flex-col items-center justify-center gap-4 ring ring-secondaryColor dark:ring-white bg-zinc-400 dark:bg-secondaryColor p-6 drop-shadow-lg rounded-lg"
          onSubmit={(e) => submitNewCourseDatasHandler(e)}
        >
          <CgClose
            className="absolute top-4 right-4 w-5 h-5 bg-white ring ring-white cursor-pointer text-red-600 rounded-full"
            onClick={() => setCourseEditModal(false)}
          />
          <p className="text-xl font-bold dark:bg-zinc-400 bg-secondaryColor p-2 rounded-lg text-white ring ring-secondaryColor dark:ring-white">
            Enter New Course Datas
          </p>
          <label className="flex items-center gap-2 max-w-96 w-full min-w-40 justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
            <p className="flex items-center gap-1 basis-2/5 font-medium text-base text-nowrap">
              <MdOutlineDriveFileRenameOutline className="w-5 h-5" />
              Name:
            </p>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="bg-zinc-400 dark:bg-secondaryColor dark:text-white text-black p-2 drop-shadow-lg rounded-lg basis-3/5 h-full outline-none border border-secondaryColor dark:border-white"
            />
          </label>
          <label className="flex items-center gap-2 max-w-96 w-full min-w-40 justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
            <p className="flex items-center gap-1 basis-2/5 font-medium text-base text-nowrap">
              <GiTeacher className="w-5 h-5" />
              Teacher:
            </p>
            <input
              type="text"
              value={courseTeacher}
              onChange={(e) => setCourseTeacher(e.target.value)}
              className="bg-zinc-400 dark:bg-secondaryColor dark:text-white text-black p-2 drop-shadow-lg rounded-lg basis-3/5 h-full outline-none border border-secondaryColor dark:border-white"
            />
          </label>
          <label className="flex items-center gap-2 max-w-96 w-full min-w-40 justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
            <p className="flex items-center gap-1 basis-2/5 font-medium text-base text-nowrap">
              <PiCurrencyCircleDollarFill className="w-5 h-5" />
              Price:
            </p>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(+e.target.value)}
              className="bg-zinc-400 dark:bg-secondaryColor dark:text-white text-black p-2 drop-shadow-lg rounded-lg basis-3/5 h-full outline-none border border-secondaryColor dark:border-white"
            />
          </label>
          <label className="flex items-center gap-2 max-w-96 w-full min-w-40 justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
            <p className="flex items-center gap-1 basis-2/5 font-medium text-base text-nowrap">
              <BsClockFill className="w-5 h-5" />
              Duration:
            </p>
            <input
              type="text"
              value={courseDuration}
              onChange={(e) => setCourseDuration(e.target.value)}
              className="bg-zinc-400 dark:bg-secondaryColor dark:text-white text-black p-2 drop-shadow-lg rounded-lg basis-3/5 h-full outline-none border border-secondaryColor dark:border-white"
            />
          </label>
          <label className="flex items-center gap-2 max-w-96 w-full min-w-40 justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
            <p className="flex items-center gap-1 basis-2/5 font-medium text-base text-nowrap">
              <BiSolidOffer className="w-5 h-5" />
              Offer:
            </p>
            <input
              type="number"
              value={courseOffer}
              onChange={(e) => setCourseOffer(+e.target.value)}
              className="bg-zinc-400 dark:bg-secondaryColor dark:text-white text-black p-2 drop-shadow-lg rounded-lg basis-3/5 h-full outline-none border border-secondaryColor dark:border-white"
            />
          </label>
          <button
            type="reset"
            onClick={resetFormHandler}
            className="w-full flex items-center justify-center gap-2 rounded-full p-2 text-white bg-zinc-600 hover:scale-105 border border-black dark:border-white"
          >
            <GrPowerReset className="w-6 h-6 animate-spin" />
          </button>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-full p-2 text-white bg-green-600 hover:scale-105 border border-black dark:border-white"
          >
            <TiTick className="w-6 h-6 animate-bounce" />
          </button>
        </form>
      </section>
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
          title="Please Fill Out Fields Correctly"
        />
      )}
    </>,
    document.getElementById("modals-wrapper")!
  );
});

export default EditCourseModal;
