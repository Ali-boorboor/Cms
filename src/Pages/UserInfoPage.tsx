import UserInfo from "../Components/Templates/UserInfo";
import { memo, useEffect } from "react";
import { useParams } from "react-router";
import { AxiosInstanceApp } from "../Services/AxiosInstanceApp";
import { GetOneUserInfoResponseType } from "../Types/AxiosResponsesType/AxiosResponsesType";
import { useRecoilState } from "recoil";
import { OneUserInfo } from "../Contexts/RecoilAtoms";

const UserInfoPage = memo(() => {
  const [, setOneUserInfo] = useRecoilState(OneUserInfo);
  const params = useParams();

  useEffect(() => {
    document.title = "CMS - PANEL | USER-INFOS";

    AxiosInstanceApp.get(`/user/${params.userID}`).then((res: GetOneUserInfoResponseType) =>
      setOneUserInfo(res.data.data)
    );
  }, []);

  return <UserInfo />;
});

export default UserInfoPage;
