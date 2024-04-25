import { memo } from "react";
import { useRecoilState } from "recoil";
import { globalSearchInput, showGlobalSearch } from "../../Contexts/RecoilAtoms";
import { FcSearch } from "react-icons/fc";
import { GlobalSearchInputType, setGlobalSearchHandlerType } from "../../Types/AtomsType/AtomsType";
import { Link, useNavigate } from "react-router-dom";

const GlobalSearchInput: GlobalSearchInputType = memo(() => {
  const [searchValue, setSearchValue] = useRecoilState(globalSearchInput);
  const [globalSearch, setGlobalSearch] = useRecoilState(showGlobalSearch);
  const navigate = useNavigate();
  const searchResults = [
    { title: "dashboard", link: "/" },
    { title: "courses", link: "/courses" },
    { title: "users", link: "/users-info" },
    { title: "banned users", link: "/banned-users" },
    { title: "comments", link: "/comments" },
    { title: "off tickets", link: "/off-tickets" },
  ];

  const setGlobalSearchHandler: setGlobalSearchHandlerType = () => {
    globalSearch ? setGlobalSearch(false) : setGlobalSearch(true);
  };

  return (
    <>
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
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                if (searchValue.toLowerCase() === "dashboard") {
                  navigate("/");
                  setSearchValue("");
                } else {
                  navigate(`/${searchValue.toLowerCase()}`);
                  setSearchValue("");
                }
              }
            }}
          />
        )}
      </label>
      {globalSearch && searchValue.length > 0 && (
        <ul className="flex gap-4 items-center justify-center flex-wrap border border-white dark:border-black absolute top-14 right-0 left-0 p-2 bg-secondaryColor dark:bg-zinc-400 drop-shadow-lg rounded-md">
          {searchResults
            .filter((result) => result.title.includes(searchValue))
            .map((Result) => (
              <Link
                onClick={() => setSearchValue("")}
                to={Result.link}
                className="text-white capitalize bg-zinc-800 p-2 rounded-lg hover:scale-95"
              >
                {Result.title}
              </Link>
            ))}
        </ul>
      )}
    </>
  );
});

export default GlobalSearchInput;
