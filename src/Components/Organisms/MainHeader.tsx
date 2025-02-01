import ThemeSwitchBtn from "../Atoms/ThemeSwitchBtn";
import GlobalSearchInput from "../Atoms/GlobalSearchInput";
import { memo } from "react";
import { IoIosMenu } from "react-icons/io";
import { useRecoilState } from "recoil";
import { isErrorModal, isSuccessModal, showHeaderItems } from "../../Contexts/RecoilAtoms";
import { RiCloseCircleLine } from "react-icons/ri";
import { MainHeaderType } from "../../Types/OrganismsType/OrganismsType";
import { CiLogout } from "react-icons/ci";
import { AxiosInstanceApp } from "../../Services/AxiosInstanceApp";
import { useNavigate } from "react-router";
import Toast from "../Molecules/Toast";
import { TiTick } from "react-icons/ti";
import { MdError } from "react-icons/md";

const MainHeader: MainHeaderType = memo(() => {
  const [successLogout, setSuccessLogout] = useRecoilState(isSuccessModal);
  const [failedLogout, setFailedLogout] = useRecoilState(isErrorModal);
  const [headerItems, setHeaderItems] = useRecoilState(showHeaderItems);
  const navigate = useNavigate();

  return (
    <>
      <header className="flex justify-center sm:justify-between items-center p-4 sm:pr-8 gap-4 sticky top-0 right-0 basis-4/5 bg-zinc-400 dark:bg-secondaryColor drop-shadow-lg rounded-tl-lg rounded-bl-lg z-30">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg p-2 w-full max-w-40 text-white hover:scale-105 border border-black dark:border-white bg-red-600"
          onClick={() => {
            AxiosInstanceApp.post(
              "/auth/logout",
              {},
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            )
              .then(() => {
                setSuccessLogout(true);
                localStorage.clear();
                setTimeout(() => {
                  navigate("/");
                }, 1500);
              })
              .catch(() => setFailedLogout(true));
          }}
        >
          Logout
          <CiLogout className="w-5 h-5 text-white" />
        </button>
        {window.innerWidth > 600 ? (
          <section className="hidden sm:flex justify-center items-center gap-4">
            <GlobalSearchInput />
            <ThemeSwitchBtn />
          </section>
        ) : (
          <>
            <button
              type="button"
              className={`rounded-full p-2 bg-secondaryColor text-white dark:bg-primaryColor border-2 border-primaryColor dark:border-white ${
                headerItems ? "hidden" : "block"
              }`}
              onClick={() => (headerItems ? setHeaderItems(false) : setHeaderItems(true))}
            >
              <IoIosMenu className="w-6 h-6" />
            </button>
            <section
              className={`flex fixed top-0 right-0 bottom-0 h-screen p-6 bg-zinc-400 drop-shadow-md dark:bg-secondaryColor flex-col justify-center items-center gap-4 ${
                headerItems
                  ? "w-full opacity-100 pointer-events-auto"
                  : "w-0 opacity-0 pointer-events-none"
              }`}
            >
              <button
                type="button"
                className="rounded-full p-2 bg-secondaryColor text-white dark:bg-primaryColor border-2 border-primaryColor dark:border-white"
                onClick={() => setHeaderItems(false)}
              >
                <RiCloseCircleLine className="w-6 h-6" />
              </button>
              <GlobalSearchInput />
              <ThemeSwitchBtn />
            </section>
          </>
        )}
      </header>
      {successLogout && (
        <Toast
          icon={<TiTick className="w-5 h-5 text-green-600" />}
          title="Logout Was Successfull"
        />
      )}
      {failedLogout && (
        <Toast icon={<MdError className="w-5 h-5 text-red-600" />} title="Failed Logout" />
      )}
    </>
  );
});

export default MainHeader;
