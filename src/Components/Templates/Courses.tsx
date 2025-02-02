import AddCourseSection from "../Organisms/CoursesPageComponents/AddCourseSection";
import CoursesTable from "../Organisms/CoursesPageComponents/CoursesTable";
import Alert from "../Atoms/Alert";
import { useRecoilState, useRecoilValue } from "recoil";
import { AllCourses, courseSearchInput, courseSortFilter } from "../../Contexts/RecoilAtoms";
import { memo } from "react";
import { FaBook } from "react-icons/fa";
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";

const Courses = memo(() => {
  const allCourses = useRecoilValue(AllCourses);
  const [searchInput, setSearchInput] = useRecoilState(courseSearchInput);
  const [CourseSortFilter, setCourseSortFilter] = useRecoilState(courseSortFilter);

  return (
    <main className="flex flex-col m-auto gap-4 p-4 lg:w-full md:w-[34rem] sm:w-80 w-72">
      <AddCourseSection />
      {!allCourses[0]?._id ? (
        <Alert text="Found No Course" />
      ) : (
        <section className="flex flex-col">
          <div className="flex gap-4 items-center justify-between rounded-tl-lg rounded-tr-lg bg-zinc-400 dark:bg-secondaryColor px-8 p-2 border-b border-white dark:border-black">
            <h2 className="hidden md:flex justify-center items-center basis-3/5 gap-2 text-xl font-bold p-2 rounded-lg text-secondaryColor dark:text-black bg-primaryColor bg-opacity-60 dark:bg-opacity-100">
              {`All Courses (${allCourses?.length})`}
              <FaBook className="w-6 h-6" />
            </h2>
            <div className="flex justify-end items-center gap-6 basis-2/5">
              <button
                type="button"
                className="bg-secondaryColor text-white dark:bg-primaryColor rounded-full p-2 border-2 border-primaryColor dark:border-trinityColor"
                onClick={() => setCourseSortFilter(!CourseSortFilter)}
              >
                {CourseSortFilter ? (
                  <FaSortAmountDown className="w-5 h-5" />
                ) : (
                  <FaSortAmountUpAlt className="w-5 h-5" />
                )}
              </button>
              <label className="relative flex items-center gap-2 w-32 sm:w-40 md:w-60 justify-center bg-primaryColor bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-secondaryColor dark:border-white">
                <FcSearch className="w-5 h-5 cursor-pointer" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full outline-none bg-transparent font-bold capitalize text-black dark:text-white text-base placeholder:text-gray-600 dark:placeholder:text-gray-300"
                  placeholder="Search Course"
                />
                {searchInput.length > 0 && (
                  <ul className="flex flex-col gap-2 text-center p-4 drop-shadow-lg rounded-lg absolute top-8 right-0 left-0 dark:bg-secondaryColor bg-primaryColor">
                    {allCourses
                      .filter((record) =>
                        record?.name.toUpperCase().includes(searchInput.toUpperCase())
                      )
                      .map((course) => (
                        <li
                          className="w-full p-2 rounded-lg cursor-pointer dark:text-white text-secondaryColor dark:hover:bg-white dark:hover:text-secondaryColor hover:bg-secondaryColor hover:text-white"
                          key={course?._id}
                          onClick={() => {
                            setSearchInput(course?.name);
                          }}
                        >
                          {course?.name}
                        </li>
                      ))}
                  </ul>
                )}
              </label>
            </div>
          </div>
          <CoursesTable />
        </section>
      )}
    </main>
  );
});

export default Courses;
