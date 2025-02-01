import UsersInfo from "../Components/Templates/UsersInfo";
import { GetAllUserResponsesType } from "../Types/AxiosResponsesType/AxiosResponsesType";
import { AxiosInstanceApp } from "../Services/AxiosInstanceApp";
import { AllUsers } from "../Contexts/RecoilAtoms";
import { memo, useEffect } from "react";
import { useRecoilState } from "recoil";

const UsersInfoPage = memo(() => {
  const [allUsers, setAllUsers] = useRecoilState(AllUsers);

  useEffect(() => {
    document.title = "CMS - PANEL | USERS-INFOS";

    if (allUsers.length === 0 || !allUsers[0]?._id) {
      AxiosInstanceApp.get("/user/get-all", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((res: GetAllUserResponsesType) => setAllUsers(res.data?.result));
    }
  }, []);

  return <UsersInfo />;
});

export default UsersInfoPage;
