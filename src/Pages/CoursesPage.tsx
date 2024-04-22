import Courses from "../Components/Templates/Courses";
import { memo, useEffect } from "react";
import { AllCourses } from "../Contexts/RecoilAtoms";
import { GetAllCoursesResponseType } from "../Types/AxiosResponsesType/AxiosResponsesType";
import { AxiosInstanceApp } from "../Services/AxiosInstanceApp";
import { useRecoilState } from "recoil";

const CoursesPage = memo(() => {
  const [allCourses, setAllCourses] = useRecoilState(AllCourses);

  useEffect(() => {
    document.title = "CMS - PANEL | COURSES";

    if (allCourses[0].course_id === 0) {
      AxiosInstanceApp.get("/courses").then((res: GetAllCoursesResponseType) =>
        setAllCourses(res.data.data)
      );
    }
  }, []);

  return <Courses />;
});

export default CoursesPage;
