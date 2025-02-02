import { memo } from "react";
import { CmsLogoType } from "../../Types/AtomsType/AtomsType";
import { Link } from "react-router-dom";

const CmsLogo: CmsLogoType = memo(({ link }: any) => {
  return (
    <Link
      to={link ? link : "/"}
      className="flex items-center rounded-md border-2 border-black w-[7.6rem] overflow-hidden"
    >
      <p className="bg-secondaryColor dark:bg-black text-white p-2 text-base font-bold">CMS</p>
      <p className="bg-primaryColor text-white p-2 text-base font-bold">PANEL</p>
    </Link>
  );
});

export default CmsLogo;
