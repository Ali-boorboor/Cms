import BannedUsersPageTable from "../Tables/BannedUsersPageTable";
import BannedUsersTableTRS from "../BannedUsersPageComponents/BannedUsersTableTRS";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AllBannedUsers, bannedUsersSortFilter } from "../../../Contexts/RecoilAtoms";

const BannedUsersTable = memo(() => {
  const allBannedUsers = useRecoilValue(AllBannedUsers);
  const [BannedUsersSortFilter] = useRecoilState(bannedUsersSortFilter);

  return (
    <BannedUsersPageTable th1="User Name" th2="User Email" th3="Banned At" th4="Remove User">
      {BannedUsersSortFilter
        ? allBannedUsers
            .slice()
            .reverse()
            .map((user) => <BannedUsersTableTRS key={user.banned_id} {...user} />)
        : allBannedUsers.map((user) => <BannedUsersTableTRS key={user.banned_At} {...user} />)}
    </BannedUsersPageTable>
  );
});

export default BannedUsersTable;
