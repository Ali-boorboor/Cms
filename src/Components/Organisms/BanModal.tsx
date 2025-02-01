import DeleteFormModal from "../Molecules/DeleteFormModal";
import { memo } from "react";
import { AxiosInstanceApp } from "../../Services/AxiosInstanceApp";
import { useRecoilState } from "recoil";
import { AllBannedUsers, AllComments, AllUsers, isBanModalUser } from "../../Contexts/RecoilAtoms";
import {
  GetAllBannedUsersResponseType,
  GetAllCommentResponseType,
} from "../../Types/AxiosResponsesType/AxiosResponsesType";
import { useNavigate, useParams } from "react-router";

const BanModal = memo(({ bgOpacity }: any) => {
  const [, setAllUsers] = useRecoilState(AllUsers);
  const [, setAllBannedUsers] = useRecoilState(AllBannedUsers);
  const [, setIsBanModal] = useRecoilState(isBanModalUser);
  const [, setAllComments] = useRecoilState(AllComments);
  const navigate = useNavigate();
  const { userID } = useParams();

  const onSubmitFunction = () => {
    AxiosInstanceApp.post(
      "/banned-user",
      {
        user: userID,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then(() => {
        navigate("/banned-users");
        AxiosInstanceApp.get("/banned-user/get-all", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }).then((res: GetAllBannedUsersResponseType) => setAllBannedUsers(res.data?.result));
      })
      .then(() => {
        AxiosInstanceApp.delete("/user", {
          headers: {
            Authorization: localStorage.getItem("token"),
            userid: userID,
          },
        }).then(() => {
          AxiosInstanceApp.get("/user/get-all", {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }).then((res: any) => setAllUsers(res.data?.result));
        });
      })
      .then(() => {
        AxiosInstanceApp.get("/comment/get-all", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }).then((res: GetAllCommentResponseType) => setAllComments(res.data?.result));
      })
      .catch(() => {});
  };

  const onCloseFunction = () => setIsBanModal(false);

  return (
    <>
      <DeleteFormModal
        title="User & Ban The User"
        onSubmitFunction={onSubmitFunction}
        bgOpacity={bgOpacity}
        onCloseFunction={onCloseFunction}
      />
    </>
  );
});

export default BanModal;
