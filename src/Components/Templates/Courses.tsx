import AddCourseSection from "../Organisms/CoursesPageComponents/AddCourseSection";
import CoursesTable from "../Organisms/CoursesPageComponents/CoursesTable";
import Alert from "../Atoms/Alert";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AllCourses,
  courseSearchInput,
  courseSortFilter,
  coursesCount,
} from "../../Contexts/RecoilAtoms";
import { memo, useEffect } from "react";
import { FaBook } from "react-icons/fa";
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";

const Courses = memo(() => {
  const allCourses = useRecoilValue(AllCourses);
  const [allCorsesCount, setAllCoursesCount] = useRecoilState(coursesCount);
  const [searchInput, setSearchInput] = useRecoilState(courseSearchInput);
  const [CourseSortFilter, setCourseSortFilter] = useRecoilState(courseSortFilter);

  useEffect(() => {
    const interval = setInterval(() => {
      setAllCoursesCount((prevCount) => prevCount + 1);
    }, 60);

    if (allCorsesCount === allCourses.length) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [allCorsesCount, allCourses]);

  return (
    <main className="flex flex-col m-auto gap-4 p-4 lg:w-full md:w-[34rem] sm:w-80 w-72">
      <AddCourseSection />
      {allCourses[0].course_id === 0 ? (
        <Alert text="Found No Course" />
      ) : (
        <section className="flex flex-col">
          <div className="flex gap-4 items-center justify-between rounded-tl-lg rounded-tr-lg bg-zinc-400 dark:bg-lightBlack px-8 p-2 border-b border-white dark:border-black">
            <h2 className="hidden md:flex justify-center items-center basis-3/5 gap-2 text-xl font-bold p-2 rounded-lg text-lightBlack dark:text-black bg-lightRed bg-opacity-60 dark:bg-opacity-100">
              {`All Courses (${allCorsesCount})`}
              <FaBook className="w-6 h-6" />
            </h2>
            <div className="flex justify-end items-center gap-6 basis-2/5">
              <button
                className="bg-lightBlack text-white dark:bg-lightRed rounded-full p-2 border-2 border-lightRed dark:border-lightYellow"
                onClick={() => setCourseSortFilter(!CourseSortFilter)}
              >
                {CourseSortFilter ? (
                  <FaSortAmountDown className="w-5 h-5" />
                ) : (
                  <FaSortAmountUpAlt className="w-5 h-5" />
                )}
              </button>
              <label className="relative flex items-center gap-2 w-32 sm:w-40 md:w-60 justify-center bg-lightRed bg-opacity-60 dark:bg-opacity-100 p-2 rounded-full border border-lightBlack dark:border-white">
                <FcSearch className="w-5 h-5 cursor-pointer" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full outline-none bg-transparent font-bold capitalize text-black dark:text-white text-base placeholder:text-gray-600 dark:placeholder:text-gray-300"
                  placeholder="Search Course"
                />
                {searchInput.length > 0 && (
                  <ul className="flex flex-col gap-2 text-center p-4 drop-shadow-lg rounded-lg absolute top-8 right-0 left-0 dark:bg-lightBlack bg-lightRed">
                    {allCourses
                      .filter((record) =>
                        record.course_name.toUpperCase().includes(searchInput.toUpperCase())
                      )
                      .map((course) => (
                        <li
                          className="w-full p-2 rounded-lg cursor-pointer dark:text-white text-lightBlack dark:hover:bg-white dark:hover:text-lightBlack hover:bg-lightBlack hover:text-white"
                          key={course.course_id}
                          onClick={() => {
                            setSearchInput(course.course_name);
                          }}
                        >
                          {course.course_name}
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
