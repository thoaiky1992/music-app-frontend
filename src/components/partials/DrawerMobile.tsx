import Logo from "@/assets/logo.webp";
import {
  ChevronLeftIcon,
  ClipboardListIcon,
  HeartIcon,
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  MusicNoteIcon,
} from "@heroicons/react/outline";
import { Dialog } from "@headlessui/react";
import { FC, useRef, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { useStore } from "react-redux";
import { openModalLoginAction } from "@/store/actions/modal-login.actions";
import { userLogoutAction } from "@/store/actions/user.actions";
import classNames from "classnames";
import { MdCategory } from "react-icons/md";
import {
  DRAWER_LIST,
  MODAL_OPEN,
  UPDATE_IS_OPEN_PLAY_PLIST_MODAL,
} from "@/constants";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
interface DrawerMobileProps {
  showSidebar: boolean;
  setShowSidebar: Function;
}

const DrawerMobile: FC<DrawerMobileProps> = ({
  showSidebar,
  setShowSidebar,
}) => {
  //prevent sidebar close before adding effects
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const userStore = useAppSelector((state: RootState) => state.user);
  const modalLoginStore = useAppSelector(
    (state: RootState) => state.modalLogin
  );
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const handleSidebarClose = () => {
    sidebarRef.current?.classList.remove("slideLeftReturn");
    sidebarRef.current?.classList.add("slideLeft");
    overlayRef.current?.classList.remove("animate__fadeIn");
    overlayRef.current?.classList.add("animate__fadeOut");

    setTimeout(() => {
      setShowSidebar(false);
    }, 400);
  };

  const handleOpenModalLogin = () => {
    handleSidebarClose();
    setTimeout(() => {
      dispatch(openModalLoginAction());
    }, 400);
  };

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

  const handleDirection = (href: string, isAuth: boolean) => {
    if (isAuth && !userStore.user) {
      handleSidebarClose();
      dispatch({
        type: UPDATE_IS_OPEN_PLAY_PLIST_MODAL,
        payload: { newIsOpen: false },
      });
      dispatch({ type: MODAL_OPEN });
      return;
    }
    handleSidebarClose();
    dispatch({
      type: UPDATE_IS_OPEN_PLAY_PLIST_MODAL,
      payload: { newIsOpen: false },
    });
    navigate(href);
  };

  return (
    <Dialog open={showSidebar} onClose={handleSidebarClose}>
      <Dialog.Overlay
        ref={overlayRef}
        className="animate__fadeIn animate__animated animate__faster fixed flex inset-0 z-[999999]"
        aria-hidden="true"
      >
        <div
          ref={sidebarRef}
          className={classNames(
            "magictime fixed flex flex-col w-[250px] bg-primary lg:bg-transparent h-screen shadow-lg shadow-text-1 z-50 text-text-2",
            { slideLeftReturn: showSidebar }
          )}
        >
          <div className="w-full flex justify-end p-2 absolute top-0 right-0">
            <div
              className="h-8 w-8 bg-third rounded-full flex justify-center items-center focus:outline-none"
              onClick={handleSidebarClose}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="w-full flex justify-center my-10">
            {userStore?.user ? (
              <div className="flex flex-col items-center">
                <img
                  src={userStore.user.image}
                  className="h-[60px] w-[60px] object-cover rounded-full border ring ring-high-light"
                  onClick={handleSidebarClose}
                />
                <h1 className="mt-2">{userStore?.user.name}</h1>
              </div>
            ) : (
              <img
                src={Logo}
                className="h-[60px] w-[100%] px-10 object-contain"
                onClick={handleSidebarClose}
              />
            )}
          </div>
          <div className="w-full flex justify-center">
            <div className="border-b-[1px] border-text-1 w-[80%]"></div>
          </div>
          <div className="w-full mx-5 my-5 flex-1 flex flex-col">
            <div className="flex-1 flex flex-col">
              {DRAWER_LIST.map((item: any, index: number) => (
                <div
                  onClick={() => handleDirection(item.href, item.isAuth)}
                  key={index}
                  className={classNames(
                    "flex items-center my-5 hover:text-high-light outline-none",
                    { "text-high-light": item.href == location.pathname }
                  )}
                >
                  {getIcon(item.icon)}
                  <div className="mt-[1px]">{item.title}</div>
                </div>
              ))}
              <div className="w-full my-5">
                <div className="border-b-[1px] border-text-1 w-[80%]"></div>
              </div>

              {userStore?.user ? (
                <div
                  className="flex items-center"
                  onClick={() => dispatch(userLogoutAction())}
                >
                  <LogoutIcon className="w-5 h-5 mr-5" />
                  <h1>Logout</h1>
                </div>
              ) : (
                <div
                  className="flex items-center"
                  onClick={handleOpenModalLogin}
                >
                  <LoginIcon className="w-5 h-5 mr-5" />
                  <h1>Login</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog.Overlay>
    </Dialog>
  );
};
export default DrawerMobile;
