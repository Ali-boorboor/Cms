import CmsLogo from "../Atoms/CmsLogo";
import ThemeSwitchBtn from "../Atoms/ThemeSwitchBtn";
import GlobalSearchInput from "../Atoms/GlobalSearchInput";
import { memo } from "react";
import { IoIosMenu } from "react-icons/io";
import { useRecoilState } from "recoil";
import { showHeaderItems } from "../../Contexts/RecoilAtoms";
import { RiCloseCircleLine } from "react-icons/ri";
import { MainHeaderType } from "../../Types/OrganismsType/OrganismsType";

const MainHeader: MainHeaderType = memo(() => {
  const [headerItems, setHeaderItems] = useRecoilState(showHeaderItems);

  return (
    <header className="flex justify-center sm:justify-between items-center p-4 sm:pr-8 gap-4 sticky top-0 right-0 basis-4/5 bg-zinc-400 dark:bg-lightBlack drop-shadow-lg rounded-tl-lg rounded-bl-lg z-30">
      <CmsLogo />
      {window.innerWidth > 600 ? (
        <section className="hidden sm:flex justify-center items-center gap-4">
          <GlobalSearchInput />
          <ThemeSwitchBtn />
        </section>
      ) : (
        <>
          <button
            className={`rounded-full p-2 bg-lightBlack text-white dark:bg-lightRed border-2 border-lightRed dark:border-white ${
              headerItems ? "hidden" : "block"
            }`}
            onClick={() => (headerItems ? setHeaderItems(false) : setHeaderItems(true))}
          >
            <IoIosMenu className="w-6 h-6" />
          </button>
          <section
            className={`flex fixed top-0 right-0 bottom-0 h-screen p-6 bg-zinc-400 drop-shadow-md dark:bg-lightBlack flex-col justify-center items-center gap-4 ${
              headerItems
                ? "w-full opacity-100 pointer-events-auto"
                : "w-0 opacity-0 pointer-events-none"
            }`}
          >
            <button
              className="rounded-full p-2 bg-lightBlack text-white dark:bg-lightRed border-2 border-lightRed dark:border-white"
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
  );
});

export default MainHeader;
