import { CustomRouteProps } from "@/config/routes";
import { Outlet } from "react-router-dom";

const DefaultLayout = (props: CustomRouteProps) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default DefaultLayout;
