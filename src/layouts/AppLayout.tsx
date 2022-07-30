import DrawerDesktop from "@/components/partials/DrawerDesktop";
import DrawerMobile from "@/components/partials/DrawerMobile";
import Header from "@/components/partials/Header";
import ControlMusic from "@/components/shared/ControlMusic";
import { CustomRouteProps } from "@/config/routes";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";

const AppLayout = (props: CustomRouteProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div
      className="font-poppins bg-app w-screen h-screen text-text-1 flex bg-no-repeat bg-cover bg-center
    "
      style={{ backgroundImage: 'url("footer_bg.png")' }}
    >
      {isMobile ? (
        <DrawerMobile
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      ) : (
        <DrawerDesktop />
      )}
      <div className="flex-1 h-full flex flex-col ">
        <Header setShowSidebar={setShowSidebar} />
        <div className="flex-1 overflow-y-scroll content p-5">
          <Outlet />
        </div>
      </div>
      <ControlMusic />
    </div>
  );
};
export default AppLayout;
