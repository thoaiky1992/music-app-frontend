import Logo from "@/assets/logo.webp";
import { DRAWER_LIST, UPDATE_IS_OPEN_PLAY_PLIST_MODAL } from "@/constants";
import { useAppDispatch } from "@/store/configStore";
import {
  ClipboardListIcon,
  HeartIcon,
  HomeIcon,
  MusicNoteIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
import { MdCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";
const DrawerDesktop = () => {
  const dispatch = useAppDispatch();
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <HomeIcon className="w-5 h-5 mr-5" />;
      case "music":
        return <MusicNoteIcon className="w-5 h-5 mr-5" />;
      case "list":
        return <ClipboardListIcon className="w-5 h-5 mr-5" />;
      case "like":
        return <HeartIcon className="w-5 h-5 mr-5" />;
      case "genre":
        return <MdCategory className="w-5 h-5 mr-5" />;
      default:
        return <HomeIcon className="w-5 h-5 mr-5" />;
    }
  };
  return (
    <div className="fixed lg:relative lg:flex flex-col w-[250px] bg-primary lg:bg-transparent h-screen shadow-lg shadow-text-1 z-50 text-text-2">
      <div className="w-full flex justify-center py-10">
        <img src={Logo} className="h-[60px] w-[100%] px-10 object-contain" />
      </div>
      <div className="w-full flex justify-center">
        <div className="border-b-[1px] border-text-1 w-[80%]"></div>
      </div>
      <div className="w-full px-10 pt-5 flex-1 flex flex-col">
        {DRAWER_LIST.map((item: any, index: number) => (
          <NavLink
            onClick={() =>
              dispatch({
                type: UPDATE_IS_OPEN_PLAY_PLIST_MODAL,
                payload: { newIsOpen: false },
              })
            }
            key={index}
            to={item.href}
            className={({ isActive }) =>
              classNames("flex items-center mt-10 hover:text-high-light", {
                "text-high-light": isActive,
              })
            }
          >
            {getIcon(item.icon)}
            <div className="mt-[1px]">{item.title}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
export default DrawerDesktop;
