import CmsLogo from "../Components/Atoms/CmsLogo";
import Toast from "../Components/Molecules/Toast";
import { MdError, MdOutlineDriveFileRenameOutline, MdPassword } from "react-icons/md";
import { memo, useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { FaThumbsUp } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { TbLogin2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { AxiosInstanceApp } from "../Services/AxiosInstanceApp";
import { isErrorModal, isSuccessModal } from "../Contexts/RecoilAtoms";
import { useRecoilState } from "recoil";

const LoginPage = memo(() => {
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [userNameInputValidator, setUserNameInputValidator] = useState(false);
  const [passwordInputValidator, setPasswordInputValidator] = useState(false);
  const [successLoginModal, setSuccessLoginModal] = useRecoilState(isSuccessModal);
  const [failedLoginModal, setFailedLoginModal] = useRecoilState(isErrorModal);
  const navigate = useNavigate();

  document.title = "LOGIN TO CMS";

  useEffect(() => {
    userNameInput.trim().length >= 3
      ? setUserNameInputValidator(true)
      : setUserNameInputValidator(false);
    passwordInput.trim().length >= 6
      ? setPasswordInputValidator(true)
      : setPasswordInputValidator(false);
  }, [userNameInput, passwordInput]);

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userNameInputValidator && passwordInputValidator) {
      AxiosInstanceApp.post("/auth/login", {
        username: userNameInput,
        password: passwordInput,
      })
        .then((res: any) => {
          localStorage.setItem("token", `Bearer ${res.data?.accessToken}`);
          localStorage.setItem("userID", `${res.data?.userData?.id}`);
          setSuccessLoginModal(true);
          setUserNameInput("");
          setPasswordInput("");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        })
        .catch(() => setFailedLoginModal(true));
    } else {
      setFailedLoginModal(true);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center fixed z-50 inset-0 backdrop-blur-3xl bg-zinc-500">
        <form
          onSubmit={loginHandler}
          className="flex flex-col gap-4 justify-center items-center dark:bg-zinc-600 bg-zinc-400 max-w-screen-sm min-w-96 w-full rounded-lg border border-secondaryColor dark:border-white py-6 px-2 shadow-xl"
        >
          <CmsLogo />
          <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-nowrap flex-wrap p-4">
            <h1 className="border border-secondaryColor dark:border-white flex max-w-96 w-full rounded-lg items-center gap-2 justify-center text-xl font-bold p-2 text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
              Login Page
            </h1>
            <label className="max-w-96 w-full min-w-40 flex gap-2 items-center justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
              <MdOutlineDriveFileRenameOutline className="w-5 h-5 dark:text-white text-secondaryColor" />
              <input
                type="text"
                placeholder="User Name"
                value={userNameInput}
                onChange={(e) => setUserNameInput(e.target.value)}
                className="w-full outline-none bg-transparent font-bold text-secondaryColor dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
              />
              <button type="button" className="bg-white rounded-full p-1">
                {userNameInputValidator ? (
                  <TiTick className="w-6 h-6 text-green-600" />
                ) : (
                  <BiSolidError className="w-6 h-6 text-red-600" />
                )}
              </button>
            </label>
            <label className="max-w-96 w-full min-w-40 flex gap-2 items-center justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
              <MdPassword className="w-5 h-5 dark:text-white text-secondaryColor" />
              <input
                type="password"
                placeholder="User Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full outline-none bg-transparent font-bold text-secondaryColor dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
              />
              <button type="button" className="bg-white rounded-full p-1">
                {passwordInputValidator ? (
                  <TiTick className="w-6 h-6 text-green-600" />
                ) : (
                  <BiSolidError className="w-6 h-6 text-red-600" />
                )}
              </button>
            </label>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <button
              type="submit"
              className={`flex items-center justify-center gap-2 rounded-lg p-2 w-40 text-white hover:scale-105 border border-black dark:border-white ${
                userNameInputValidator && passwordInputValidator ? "bg-green-600" : "bg-red-600"
              }`}
            >
              Sign In
              <TbLogin2 className="w-5 h-5 text-white" />
            </button>
            <p className="my-3 w-3/4 h-[0.6px] bg-zinc-300"></p>
            <Link
              to="/sign-up"
              className="flex items-center justify-center gap-2 rounded-lg p-2 w-40 text-white hover:scale-105 border border-black dark:border-white bg-green-600"
            >
              Sign Up
              <FaThumbsUp className="w-5 h-5 text-white" />
            </Link>
          </div>
        </form>
      </div>
      {successLoginModal && (
        <Toast icon={<TiTick className="w-5 h-5 text-green-600" />} title="Login Was Successfull" />
      )}
      {failedLoginModal && (
        <Toast icon={<MdError className="w-5 h-5 text-red-600" />} title="Login Failed" />
      )}
    </>
  );
});

export default LoginPage;
