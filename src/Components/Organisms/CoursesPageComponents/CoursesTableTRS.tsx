import { memo } from "react";

const CoursesTableTRS = memo((course: any) => {
  return (
    <tr className="text-center bg-lightRed bg-opacity-60 border-b dark:bg-opacity-100 dark:border-zinc-700 hover:bg-opacity-70 dark:hover:bg-opacity-70">
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
          src={`/images/${course.course_img}`}
          className="rounded-md object-cover w-full h-full border border-white dark:border-black"
        />
      </th>
      <td className="px-6 py-4">{course.course_name}</td>
      <td className="px-6 py-4">{course.course_teacher}</td>
      <td className="px-6 py-4">{course.course_duration}H</td>
      <td className="px-6 py-4">{course.course_price.toLocaleString()} </td>
      <td className="px-6 py-4">
        {course.course_offer ? (
          course.course_offer
        ) : (
          <p className="text-center text-red-600 bg-white text-lg font-bold p-1 rounded-md">
            No Data
          </p>
        )}
      </td>
      <td className="px-6 py-4">
        {course.updated_At ? (
          course.updated_At.toLocaleString().slice(0, 25)
        ) : (
          <p className="text-center text-red-600 bg-white text-lg font-bold p-1 rounded-md">
            No Data
          </p>
        )}
      </td>
      <td className="px-6 py-4">{course.created_At.toLocaleString().slice(0, 25)}</td>
      <td className="px-6 py-4">
        <button className="font-medium bg-blue-500 dark:bg-blue-600 text-white rounded-md p-1 hover:bg-white hover:text-blue-500">
          Edit
        </button>
      </td>
      <td className="px-6 py-4">
        <button className="bg-red-500 dark:bg-red-600 p-1 rounded-md text-white hover:text-red-500 hover:bg-white">
          Remove
        </button>
      </td>
    </tr>
  );
});

export default CoursesTableTRS;
