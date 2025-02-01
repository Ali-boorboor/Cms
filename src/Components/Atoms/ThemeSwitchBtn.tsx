import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { DarkMode } from "../../Contexts/RecoilAtoms";
import { ThemeSwithBtnType, setDarkModeHandlerType } from "../../Types/AtomsType/AtomsType";
import { PiSunHorizon } from "react-icons/pi";
import { TbHazeMoon } from "react-icons/tb";

const ThemeSwitchBtn: ThemeSwithBtnType = memo(() => {
  const [darkMode, setDarkMode] = useRecoilState(DarkMode);
  const Theme = useRecoilValue(DarkMode);

  const setDarkModeHandler: setDarkModeHandlerType = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  };

  return (
    <button
      type="button"
      className="bg-secondaryColor text-white dark:bg-primaryColor rounded-full p-2 border-2 border-primaryColor dark:border-trinityColor"
      onClick={() => setDarkModeHandler()}
    >
      {Theme ? <PiSunHorizon className="w-6 h-6" /> : <TbHazeMoon className="w-6 h-6" />}
    </button>
  );
});

export default ThemeSwitchBtn;
