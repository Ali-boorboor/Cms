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

    if (allCourses.length === 0 || !allCourses[0]?._id) {
      AxiosInstanceApp.get("/course/get-all", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res: GetAllCoursesResponseType) => setAllCourses(res.data?.result));
    }
  }, []);

  return <Courses />;
});

export default CoursesPage;
