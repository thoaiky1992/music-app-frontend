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

  return (
    <Dialog open={showSidebar} onClose={handleSidebarClose}>
      <Dialog.Overlay
        ref={overlayRef}
        className="animate__fadeIn animate__animated animate__faster fixed flex inset-0 z-[100]"
        aria-hidden="true"
      >
        <div
          ref={sidebarRef}
          className={`${
            showSidebar && "slideLeftReturn"
          } magictime fixed flex flex-col w-[250px] bg-primary lg:bg-transparent h-screen shadow-lg shadow-text-1 z-50 text-text-2`}
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
          <div className="w-full mx-5 my-10 lg:m-10 flex-1 flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center text-high-light">
                <HomeIcon className="w-5 h-5 mr-5" />
                <span className="mt-1">Home</span>
              </div>
              <div className="flex items-center mt-10">
                <MusicNoteIcon className="w-5 h-5 mr-5" />
                <span>Music</span>
              </div>
              <div className="flex items-center mt-10">
                <ClipboardListIcon className="w-5 h-5 mr-5" />
                <span className="mt-[1px]">Playlist</span>
              </div>
              <div className="flex items-center mt-10">
                <HeartIcon className="w-5 h-5 mr-5" />
                <span className="mt-[1px]">Favorite</span>
              </div>
              <div className="w-full my-10">
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
