import Toast from "../../Molecules/Toast";
import React, { memo, useEffect } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { MdBookmarkAdd } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import { TbNumbers } from "react-icons/tb";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isResetModal,
  isSuccessModal,
  isErrorModal,
  AddTicketCodeInput,
  AddTicketCodeInputValidator,
  AddTicketQuantityInput,
  AddTicketQuantityInputValidator,
  AddTicketCourseIDInput,
  AddTicketCourseIDInputValidator,
  AllTickets,
  AllCourses,
} from "../../../Contexts/RecoilAtoms";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import { GetAllTicketResponseType } from "../../../Types/AxiosResponsesType/AxiosResponsesType";
import { BiSolidError } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { MdError } from "react-icons/md";

const AddTicketSection = memo(() => {
  const [resetFormModal, setResetFormModal] = useRecoilState(isResetModal);
  const [submitFormModal, setSubmitFormModal] = useRecoilState(isSuccessModal);
  const [errorFormModal, setErrorFormModal] = useRecoilState(isErrorModal);
  const [addTicketCodeInput, setAddTicketCodeInput] = useRecoilState(AddTicketCodeInput);
  const [addTicketCodeInputValidator, setAddTicketCodeInputValidator] = useRecoilState(
    AddTicketCodeInputValidator
  );
  const [addTicketQuantityInput, setAddTicketQuantityInput] =
    useRecoilState(AddTicketQuantityInput);
  const [addTicketQuantityInputValidator, setAddTicketQuantityInputValidator] = useRecoilState(
    AddTicketQuantityInputValidator
  );
  const [addTicketCourseInput, setAddTicketCourseInput] = useRecoilState(AddTicketCourseIDInput);
  const [addTicketCourseInputValidator, setAddTicketCourseInputValidator] = useRecoilState(
    AddTicketCourseIDInputValidator
  );
  const [, setAllTickets] = useRecoilState(AllTickets);
  const allCourses = useRecoilValue(AllCourses);

  useEffect(() => {
    /\w{3}/.test(addTicketCodeInput)
      ? setAddTicketCodeInputValidator(true)
      : setAddTicketCodeInputValidator(false);
    addTicketQuantityInput > 0
      ? setAddTicketQuantityInputValidator(true)
      : setAddTicketQuantityInputValidator(false);
    addTicketCourseInput > 1
      ? setAddTicketCourseInputValidator(true)
      : setAddTicketCourseInputValidator(false);
  }, [addTicketCodeInput, addTicketQuantityInput, addTicketCourseInput]);

  const addFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      addTicketCodeInputValidator &&
      addTicketQuantityInputValidator &&
      addTicketCourseInputValidator
    ) {
      AxiosInstanceApp.post("/off-ticket", {
        offCode: addTicketCodeInput,
        offQuantity: addTicketQuantityInput,
        courseID: addTicketCourseInput,
      }).then(() => {
        setSubmitFormModal(true);
        AxiosInstanceApp.get("/off-ticket").then((res: GetAllTicketResponseType) =>
          setAllTickets(res.data.data)
        );
        setAddTicketCodeInput("");
        setAddTicketCourseInput(0);
        setAddTicketQuantityInput(0);
      });
    } else {
      setErrorFormModal(true);
    }
  };

  const resetAddUserFormHandler = () => {
    setResetFormModal(true);
    setAddTicketCodeInput("");
    setAddTicketCourseInput(0);
    setAddTicketQuantityInput(0);
  };

  return (
    <>
      <form
        className="flex flex-col rounded-lg overflow-hidden bg-zinc-400 dark:bg-secondaryColor pb-4"
        onSubmit={(e) => addFormSubmitHandler(e)}
      >
        <h1 className="flex items-center gap-2 md:flex justify-center text-xl font-bold p-2 text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
          Add New Ticket
          <MdBookmarkAdd className="w-5 h-5" />
        </h1>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex items-center justify-center gap-6 md:flex-nowrap flex-wrap p-4">
            <label className="max-w-96 w-full min-w-40 flex gap-2 items-center justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
              <MdOutlineDriveFileRenameOutline className="w-5 h-5 dark:text-white text-secondaryColor" />
              <input
                type="text"
                placeholder="Ticket Code"
                value={addTicketCodeInput}
                onChange={(e) => setAddTicketCodeInput(e.target.value)}
                className="w-full outline-none bg-transparent font-bold text-secondaryColor dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
              />
              <button className="bg-white rounded-full p-1">
                {addTicketCodeInputValidator ? (
                  <TiTick className="w-6 h-6 text-green-600" />
                ) : (
                  <BiSolidError className="w-6 h-6 text-red-600" />
                )}
              </button>
            </label>
            <label className="max-w-96 w-full min-w-40 flex gap-2 items-center justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
              <TbNumbers className="w-5 h-5 dark:text-white text-secondaryColor" />
              <input
                type="number"
                placeholder="Ticket Quantity"
                value={addTicketQuantityInput}
                onChange={(e) => setAddTicketQuantityInput(+e.target.value)}
                className="w-full outline-none bg-transparent font-bold text-secondaryColor dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
              />
              <button className="bg-white rounded-full p-1">
                {addTicketQuantityInputValidator ? (
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
                addTicketCourseInputValidator ? "bg-green-600" : "bg-red-600"
              } bg-opacity-90 p-2 rounded-full border border-secondaryColor dark:border-white outline-none`}
              onChange={(e) => {
                const dashIndex = e.target.value.indexOf("-");
                setAddTicketCourseInput(+e.target.value.slice(0, dashIndex));
              }}
            >
              <option className="w-full outline-none bg-transparent font-bold text-white text-base">
                1 - Please Choose
              </option>
              {allCourses.map((course) => (
                <option
                  key={course.course_id}
                  className="w-full outline-none bg-transparent font-bold text-white text-base"
                >
                  {`${course.course_id} - ${course.course_name}`}
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
              addTicketCodeInputValidator &&
              addTicketQuantityInputValidator &&
              addTicketCourseInputValidator
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
      {submitFormModal && (
        <Toast
          icon={<TiTick className="w-5 h-5 text-green-600" />}
          title="Ticket Created Successfully"
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

export default AddTicketSection;
