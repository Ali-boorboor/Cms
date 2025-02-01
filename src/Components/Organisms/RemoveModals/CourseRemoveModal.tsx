import DeleteFormModal from "../../Molecules/DeleteFormModal";
import { AxiosInstanceApp } from "../../../Services/AxiosInstanceApp";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AllComments,
  AllCourses,
  AllTickets,
  isRemoveModalCourse,
  mainCourseIDToRemove,
} from "../../../Contexts/RecoilAtoms";
import {
  GetAllCommentResponseType,
  GetAllCoursesResponseType,
  GetAllTicketResponseType,
} from "../../../Types/AxiosResponsesType/AxiosResponsesType";

const CourseRemoveModal = memo(({ bgOpacity }: any) => {
  const mainCourseRemove = useRecoilValue(mainCourseIDToRemove);
  const [, setAllCourses] = useRecoilState(AllCourses);
  const [, setIsRemoveModal] = useRecoilState(isRemoveModalCourse);
  const [, setAllComments] = useRecoilState(AllComments);
  const [, setAllTickets] = useRecoilState(AllTickets);

  const onSubmitFunction = () => {
    AxiosInstanceApp.delete("/course", {
      headers: {
        Authorization: localStorage.getItem("token"),
        courseid: mainCourseRemove,
      },
    })
      .then(() => {
        AxiosInstanceApp.get("/course/get-all", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }).then((res: GetAllCoursesResponseType) => setAllCourses(res.data?.result));
      })
      .then(() => {
        AxiosInstanceApp.get("/comment/get-all", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }).then((res: GetAllCommentResponseType) => setAllComments(res.data?.result));
      })
      .then(() => {
        AxiosInstanceApp.get("/off-ticket/get-all", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }).then((res: GetAllTicketResponseType) => setAllTickets(res.data?.result));
      });
  };

  const onCloseFunction = () => setIsRemoveModal(false);

  return (
    <DeleteFormModal
      title="Course"
      onSubmitFunction={onSubmitFunction}
      bgOpacity={bgOpacity}
      onCloseFunction={onCloseFunction}
    />
  );
});

export default CourseRemoveModal;
