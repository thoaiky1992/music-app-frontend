import { SearchIcon } from "@heroicons/react/outline";
import HeaderUserInfo from "../shared/HeaderUserInfo";
import { HiMenuAlt2 } from "react-icons/hi";
import Logo from "@/assets/logo.webp";
import { FC } from "react";

interface HeaderProps {
  setShowSidebar: Function;
}
const Header: FC<HeaderProps> = ({ setShowSidebar }) => {
  return (
    <div className="w-full flex min-h-[80px] h-[80px] bg-primary justify-between items-center px-5">
      <div className="lg:hidden flex items-start">
        <HiMenuAlt2
          className="w-8 h-[40px] mr-3"
          onClick={() => setShowSidebar(true)}
        />
        <img src={Logo} className="w-[120px] h-[40px] object-contain " alt="" />
      </div>
      <div className="search lg:min-w-[400px] lg:max-w-[400px] flex h-full items-center relative">
        <input
          className="h-[35px] lg:h-[50px] w-[150px] sm:w-[180px] pr-10 lg:pr-12 lg:w-full rounded-full px-5 bg-third text-[8px] lg:text-xs text-text-1 focus:outline-none"
          type="text"
          placeholder="Search for Song..."
        />
        <SearchIcon className="w-3 h-3 lg:w-5 lg:h-5 absolute right-3 lg:right-5 top-50% text-text-1" />
      </div>
      <HeaderUserInfo />
    </div>
  );
};
export default Header;
