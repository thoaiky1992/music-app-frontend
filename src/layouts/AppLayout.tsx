import DrawerDesktop from "@/components/partials/DrawerDesktop";
import DrawerMobile from "@/components/partials/DrawerMobile";
import Header from "@/components/partials/Header";
import ControlBar from "@/components/shared/controls/ControlBar";
import ModalLogin from "@/components/shared/ModalLogin";
import { useLocalStorage } from "@/composables/useLocalStorage";
import { ACCESS_TOKEN } from "@/constants";
import useSocketIOContext from "@/context/socket-io.context";
import { RootState, useAppSelector } from "@/store/configStore";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";

const AppLayout = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const userStore = useAppSelector((state: RootState) => state.user);
  const { setSocket } = useSocketIOContext();

  useEffect(() => {
    if (userStore.user) {
      const tokenStorage = useLocalStorage(ACCESS_TOKEN);
      setSocket(() => io({ auth: { token: tokenStorage.getItem() } }));
    }
  }, [userStore.user]);

  return (
    <div
      className="font-poppins bg-app w-screen h-screen text-text-1 flex bg-no-repeat bg-cover bg-center
    "
      style={{ backgroundImage: 'url("/footer_bg.png")' }}
    >
      {isMobile ? (
        <DrawerMobile
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      ) : (
        <DrawerDesktop />
      )}
      <div className="lg:flex-1 h-screen w-screen flex flex-col">
        <Header setShowSidebar={setShowSidebar} />
        <div className="lg:flex-1 content p-5 mt-[80px] lg:mt-0 lg:overflow-y-scroll">
          <Outlet />
        </div>
      </div>
      <ControlBar />
      <ModalLogin />
    </div>
  );
};
export default AppLayout;
