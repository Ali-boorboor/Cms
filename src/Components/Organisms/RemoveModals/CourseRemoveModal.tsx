import DeleteFormModal from "../../Molecules/DeleteFormModal";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AllCourses, mainCourseIDToRemove } from "../../../Contexts/RecoilAtoms";
import { GetAllCoursesResponseType } from "../../../Types/AxiosResponsesType/AxiosResponsesType";

const CourseRemoveModal = memo(({ bgOpacity }: any) => {
  const mainCourseRemove = useRecoilValue(mainCourseIDToRemove);
  const [, setAllCources] = useRecoilState(AllCourses);

  const onSubmitFunction = () => {
    AxiosInstanceApp.delete(`/course/${mainCourseRemove}`).then(() => {
      AxiosInstanceApp.get("/courses").then((res: GetAllCoursesResponseType) =>
        setAllCources(res.data.data)
      );
    });
  };

  return <DeleteFormModal title="User" onSubmitFunction={onSubmitFunction} bgOpacity={bgOpacity} />;
});

export default CourseRemoveModal;
