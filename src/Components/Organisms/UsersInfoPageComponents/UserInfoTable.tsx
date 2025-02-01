import UsersPageTable from "../Tables/UsersPageTable";
import UserInfoTableTRs from "./UserInfoTableTRs";
import { AllUsers, UserInfoSortFilter } from "../../../Contexts/RecoilAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { memo } from "react";

const UserInfoTable = memo(() => {
  const userInfoSortFilter = useRecoilValue(UserInfoSortFilter);
  const allUsers = useRecoilState(AllUsers);

  return (
    <UsersPageTable
      th1="User Name"
      th2="User Email"
      th3="Registered At"
      th4="Remove User"
      th5="User Infos"
    >
      {userInfoSortFilter
        ? allUsers[0]
            .slice()
            .reverse()
            .map((user) => <UserInfoTableTRs key={user?._id} {...user} />)
        : allUsers[0].map((user) => <UserInfoTableTRs key={user?._id} {...user} />)}
    </UsersPageTable>
  );
});

export default UserInfoTable;
