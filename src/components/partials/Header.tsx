import { SearchIcon } from "@heroicons/react/outline";
import HeaderUserInfo from "../shared/HeaderUserInfo";
import { HiMenuAlt2 } from "react-icons/hi";
import Logo from "@/assets/logo.png";
import { ChangeEvent, FC, useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface HeaderProps {
  setShowSidebar: Function;
}
const Header: FC<HeaderProps> = ({ setShowSidebar }) => {
  const [keySearch, setKeySearch] = useState<string>("");
  const navigate = useNavigate();

  const handleDirection = () => {
    navigate("/bai-hat/search?keySearch=" + keySearch);
    setKeySearch("");
  };
  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleDirection();
    }
  };

  return (
    <div
      className="w-full fixed lg:relative flex min-h-[80px] h-[80px] bg-app justify-between items-center px-5"
      style={{ zIndex: "9999" }}
    >
      <div className="lg:hidden flex items-start">
        <HiMenuAlt2
          className="w-8 h-[40px] mr-3"
          onClick={() => setShowSidebar(true)}
        />
        <Link to={"/"}>
          <img
            src={Logo}
            className="w-[120px] h-[40px] object-contain "
            alt=""
          />
        </Link>
      </div>
      <div className="search lg:min-w-[400px] lg:max-w-[400px] flex h-full items-center relative">
        <input
          className="h-[35px] lg:h-[50px] w-[160px] sm:w-[180px] pr-8 lg:pr-12 lg:w-full rounded-full px-5 bg-third text-[10px] lg:text-xs text-text-1 focus:outline-none"
          type="text"
          placeholder="Tìm bài hát..."
          value={keySearch}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setKeySearch(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />
        <SearchIcon
          className="w-3 h-3 lg:w-5 lg:h-5 absolute right-3 lg:right-5 top-50% text-text-1 cursor-pointer"
          onClick={handleDirection}
        />
      </div>
      <HeaderUserInfo />
    </div>
  );
};
export default Header;
