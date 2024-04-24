import { memo } from "react";
import { useRecoilState } from "recoil";
import { globalSearchInput, showGlobalSearch } from "../../Contexts/RecoilAtoms";
import { FcSearch } from "react-icons/fc";
import { GlobalSearchInputType, setGlobalSearchHandlerType } from "../../Types/AtomsType/AtomsType";

const GlobalSearchInput: GlobalSearchInputType = memo(() => {
  const [searchValue, setSearchValue] = useRecoilState(globalSearchInput);
  const [globalSearch, setGlobalSearch] = useRecoilState(showGlobalSearch);

  const setGlobalSearchHandler: setGlobalSearchHandlerType = () => {
    globalSearch ? setGlobalSearch(false) : setGlobalSearch(true);
  };

  return (
    <label
      className={`${
        globalSearch ? "sm:w-60 w-40" : "w-10"
      } flex gap-2 items-center justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white`}
    >
      <FcSearch className="w-6 h-6 cursor-pointer" onClick={() => setGlobalSearchHandler()} />
      {globalSearch && (
        <input
          type="text"
          className="w-full outline-none bg-transparent font-bold capitalize text-secondaryColor dark:text-white text-base placeholder:text-gray-500 dark:placeholder:text-gray-300"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      )}
    </label>
  );
});

export default GlobalSearchInput;
