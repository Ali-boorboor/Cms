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

    if (allUsers[0].user_id === 0) {
      AxiosInstanceApp.get("/users").then((res: GetAllUserResponsesType) =>
        setAllUsers(res.data.data)
      );
    }
  }, []);

  return <UsersInfo />;
});

export default UsersInfoPage;
