import CmsLogo from "../Atoms/CmsLogo";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { GiNotebook } from "react-icons/gi";
import { FaUserLargeSlash } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { MainSideBarType } from "../../Types/OrganismsType/OrganismsType";

const MainSideBar: MainSideBarType = memo(() => {
  const ActiveLinksStyle =
    "flex items-center gap-2 px-4 py-1 rounded-md text-white font-medium text-base bg-primaryColor dark:bg-secondaryColor text-nowrap hover:bg-primaryColor dark:hover:bg-secondaryColor";
  const UnActiveLinksStyle =
    "flex items-center gap-2 px-4 py-1 rounded-md text-secondaryColor dark:text-white font-medium text-base text-nowrap hover:bg-primaryColor dark:hover:bg-secondaryColor";

  return (
    <nav className="flex flex-col justify-start gap-4 sticky basis-1/5 left-0 top-0 p-4 pl-5 h-screen bg-primaryColor bg-opacity-60 dark:bg-opacity-100 border-r border-white dark:border-black">
      <div className="hidden sm:flex justify-center items-center my-8">
        <CmsLogo link="/dashboard" />
      </div>
      <NavLink
        to="/dashboard"
        className={(link) => (link.isActive ? ActiveLinksStyle : UnActiveLinksStyle)}
      >
        <MdSpaceDashboard className="w-5 h-5" />
        {window.innerWidth > 600 && "Dashboard"}
      </NavLink>
      <NavLink
        to="/users-info"
        className={(link) => (link.isActive ? ActiveLinksStyle : UnActiveLinksStyle)}
      >
        <PiUsersThreeFill className="w-5 h-5" />
        {window.innerWidth > 600 && "Users"}
      </NavLink>
      <NavLink
        to="/courses"
        className={(link) => (link.isActive ? ActiveLinksStyle : UnActiveLinksStyle)}
      >
        <GiNotebook className="w-5 h-5" />
        {window.innerWidth > 600 && "Courses"}
      </NavLink>
      <NavLink
        to="/banned-users"
        className={(link) => (link.isActive ? ActiveLinksStyle : UnActiveLinksStyle)}
      >
        <FaUserLargeSlash className="w-5 h-5" />
        {window.innerWidth > 600 && "Banned Users"}
      </NavLink>
      <NavLink
        to="/comments"
        className={(link) => (link.isActive ? ActiveLinksStyle : UnActiveLinksStyle)}
      >
        <FaComments className="w-5 h-5" />
        {window.innerWidth > 600 && "Comments"}
      </NavLink>
      <NavLink
        to="/off-tickets"
        className={(link) => (link.isActive ? ActiveLinksStyle : UnActiveLinksStyle)}
      >
        <IoTicket className="w-5 h-5" />
        {window.innerWidth > 600 && "Off - Tickets"}
      </NavLink>
    </nav>
  );
});

export default MainSideBar;
