import CoursesTableTRS from "../../Organisms/CoursesPageComponents/CoursesTableTRS";
import CoursesPageTable from "../Tables/CoursesPageTable";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { AllCourses, courseSortFilter } from "../../../Contexts/RecoilAtoms";

const CoursesTable = memo(() => {
  const allCourses = useRecoilValue(AllCourses);
  const CourseSortFilter = useRecoilValue(courseSortFilter);

  return (
    <>
      <CoursesPageTable
        th1="Course Cover"
        th2="Course Name"
        th3="Course Teacher"
        th4="Course Duration"
        th5="Course Price"
        th6="Course Offer"
        th7="Created At"
        th8="Edit Course"
        th9="Remove Course"
      >
        {CourseSortFilter
          ? allCourses
              .slice()
              .reverse()
              .map((course) => <CoursesTableTRS key={course?._id} {...course} />)
          : allCourses.map((course) => <CoursesTableTRS key={course?._id} {...course} />)}
      </CoursesPageTable>
    </>
  );
});

export default CoursesTable;
