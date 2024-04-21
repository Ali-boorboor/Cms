import Toast from "../../Atoms/Toast";
import React, { memo, useEffect } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { FaThumbsUp } from "react-icons/fa";
import { useRecoilState } from "recoil";
import {
  AddUserEmailInput,
  AddUserEmailInputValidator,
  AddUserNameInput,
  AddUserNameInputValidator,
  AddUserPasswordInput,
  AddUserPasswordInputValidator,
  AllUsers,
  isResetModal,
  isSuccessModal,
  isErrorModal,
} from "../../../Contexts/RecoilAtoms";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import { GetAllUserResponsesType } from "../../../Types/AxiosResponsesType/AxiosResponsesType";
import { BiSolidError } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { MdError } from "react-icons/md";

const AddUserForm = memo(() => {
  const [resetAddUserFormModal, setResetAddUserFormModal] = useRecoilState(isResetModal);
  const [submitAddUserFormModal, setSubmitAddUserFormModal] = useRecoilState(isSuccessModal);
  const [errorAddUserFormModal, setErrorAddUserFormModal] = useRecoilState(isErrorModal);
  const [addUserNameInput, setAddUserNameInput] = useRecoilState(AddUserNameInput);
  const [addUserNameInputValidator, setAddUserNameInputValidator] =
    useRecoilState(AddUserNameInputValidator);
  const [addUserPasswordInput, setAddUserPasswordInput] = useRecoilState(AddUserPasswordInput);
  const [addUserPasswordInputValidator, setAddUserPasswordInputValidator] = useRecoilState(
    AddUserPasswordInputValidator
  );
  const [addUserEmailInput, setAddUserEmailInput] = useRecoilState(AddUserEmailInput);
  const [addUserEmailInputValidator, setAddUserEmailInputValidator] = useRecoilState(
    AddUserEmailInputValidator
  );
  const [, setAllUsers] = useRecoilState(AllUsers);

  useEffect(() => {
    /\w+@gmail\.[a-zA-Z]{3}/.test(addUserEmailInput)
      ? setAddUserEmailInputValidator(true)
      : setAddUserEmailInputValidator(false);
    addUserNameInput.trim().length
      ? setAddUserNameInputValidator(true)
      : setAddUserNameInputValidator(false);
    addUserPasswordInput.trim().length
      ? setAddUserPasswordInputValidator(true)
      : setAddUserPasswordInputValidator(false);
  }, [addUserNameInput, addUserEmailInput, addUserPasswordInput]);

  const addUserFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (addUserNameInputValidator && addUserEmailInputValidator && addUserPasswordInputValidator) {
      AxiosInstanceApp.post("/user", {
        userName: addUserNameInput,
        userPassword: addUserPasswordInput,
        userEmail: addUserEmailInput,
      }).then(() => {
        setSubmitAddUserFormModal(true);
        AxiosInstanceApp.get("/users").then((res: GetAllUserResponsesType) =>
          setAllUsers(res.data.data)
        );
        setAddUserNameInput("");
        setAddUserPasswordInput("");
        setAddUserEmailInput("");
      });
    } else {
      setErrorAddUserFormModal(true);
    }
  };

  const resetAddUserFormHandler = () => {
    setResetAddUserFormModal(true);
    setAddUserNameInput("");
    setAddUserPasswordInput("");
    setAddUserEmailInput("");
  };

  return (
    <>
      <form
        className="flex flex-col rounded-lg overflow-hidden bg-zinc-400 dark:bg-lightBlack pb-4"
        onSubmit={(e) => addUserFormSubmitHandler(e)}
      >
        <h1 className="flex items-center gap-2 md:flex justify-center text-xl font-bold p-2 text-lightBlack dark:text-black bg-lightRed bg-opacity-60 dark:bg-opacity-100">
          Add New User
          <FaUserPlus className="w-5 h-5" />
        </h1>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex items-center justify-center gap-6 md:flex-nowrap flex-wrap p-4">
            <label className="max-w-96 w-full min-w-40 flex gap-2 items-center justify-center bg-lightRed bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-lightBlack dark:border-white">
              <MdOutlineDriveFileRenameOutline className="w-5 h-5 dark:text-white text-lightBlack" />
              <input
                type="text"
                placeholder="User Name"
                value={addUserNameInput}
                onChange={(e) => setAddUserNameInput(e.target.value)}
                className="w-full outline-none bg-transparent font-bold text-lightBlack dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
              />
              <button className="bg-white rounded-full p-1">
                {addUserNameInputValidator ? (
                  <TiTick className="w-6 h-6 text-green-600" />
                ) : (
                  <BiSolidError className="w-6 h-6 text-red-600" />
                )}
              </button>
            </label>
            <label className="max-w-96 w-full min-w-40 flex gap-2 items-center justify-center bg-lightRed bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-lightBlack dark:border-white">
              <MdPassword className="w-5 h-5 dark:text-white text-lightBlack" />
              <input
                type="password"
                placeholder="User Password"
                value={addUserPasswordInput}
                onChange={(e) => setAddUserPasswordInput(e.target.value)}
                className="w-full outline-none bg-transparent font-bold text-lightBlack dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
              />
              <button className="bg-white rounded-full p-1">
                {addUserPasswordInputValidator ? (
                  <TiTick className="w-6 h-6 text-green-600" />
                ) : (
                  <BiSolidError className="w-6 h-6 text-red-600" />
                )}
              </button>
            </label>
          </div>
          <div className="px-4 w-full flex justify-center items-center">
            <label className="max-w-96 w-full min-w-40 flex gap-2 items-center justify-center bg-lightRed bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-lightBlack dark:border-white">
              <MdAlternateEmail className="w-5 h-5 dark:text-white text-lightBlack" />
              <input
                type="email"
                placeholder="User Email"
                value={addUserEmailInput}
                onChange={(e) => setAddUserEmailInput(e.target.value)}
                className="w-full outline-none bg-transparent font-bold text-lightBlack dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
              />
              <button className="bg-white rounded-full p-1">
                {addUserEmailInputValidator ? (
                  <TiTick className="w-6 h-6 text-green-600" />
                ) : (
                  <BiSolidError className="w-6 h-6 text-red-600" />
                )}
              </button>
            </label>
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
              addUserEmailInputValidator &&
              addUserNameInputValidator &&
              addUserPasswordInputValidator
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            Submit
            <FaThumbsUp className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>
      {resetAddUserFormModal && (
        <Toast
          icon={<GrPowerReset className="w-5 h-5 text-green-600" />}
          title="Form Reset Successfully"
        />
      )}
      {submitAddUserFormModal && (
        <Toast
          icon={<TiTick className="w-5 h-5 text-green-600" />}
          title="User Created Successfully"
        />
      )}
      {errorAddUserFormModal && (
        <Toast
          icon={<MdError className="w-5 h-5 text-red-600" />}
          title="Please Fill Out Fields Correctly"
        />
      )}
    </>
  );
});

export default AddUserForm;
