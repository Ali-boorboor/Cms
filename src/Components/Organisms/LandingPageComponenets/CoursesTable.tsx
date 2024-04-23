import Table from "../Tables/Table";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { AllCourses } from "../../../Contexts/RecoilAtoms";

const CoursesTable = memo(() => {
  const allCourses = useRecoilState(AllCourses);

  return (
    <Table th1="Course Cover" th2="Course Name" th3="Course Teacher" th4="Course Price">
      {allCourses[0]
        .slice()
        .reverse()
        .slice(0, 3)
        .map((course) => (
          <tr
            className="bg-lightRed bg-opacity-60 border-b dark:bg-opacity-100 dark:border-zinc-700 hover:bg-opacity-70 dark:hover:bg-opacity-70"
            key={course.course_id}
          >
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 dark:focus:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
                />
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th scope="row" className="px-6 py-4 text-black whitespace-nowrap dark:text-white">
              <img
                className="rounded-tr-2xl rounded-bl-2xl w-32 h-20 border-2 border-white dark:border-black drop-shadow-lg object-cover"
                src={`/images/${course.course_img}`}
              />
            </th>
            <td className="px-6 py-4">{course.course_name}</td>
            <td className="px-6 py-4">{course.course_teacher}</td>
            <td className="px-6 py-4 text-nowrap">
              {course.course_price === 0 ? "Free" : `${course.course_price.toLocaleString()} T`}
            </td>
          </tr>
        ))}
    </Table>
  );
});

export default CoursesTable;
