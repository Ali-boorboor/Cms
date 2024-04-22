import CoursesTableTRS from "../../Organisms/CoursesPageComponents/CoursesTableTRS";
import CoursesPageTable from "../Tables/CoursesPageTable";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AllCourses, courseSortFilter } from "../../../Contexts/RecoilAtoms";

const CoursesTable = memo(() => {
  const allCourses = useRecoilState(AllCourses);
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
        th7="Updated At"
        th8="Created At"
        th9="Edit Course"
        th10="Remove Course"
      >
        {CourseSortFilter
          ? allCourses[0]
              .slice()
              .reverse()
              .map((course) => <CoursesTableTRS key={course.course_id} {...course} />)
          : allCourses[0].map((course) => <CoursesTableTRS key={course.course_id} {...course} />)}
      </CoursesPageTable>
    </>
  );
});

export default CoursesTable;
