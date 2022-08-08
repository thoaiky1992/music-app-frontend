import { CustomRoutes } from "@/config/routes";
import { Outlet } from "react-router-dom";

const DefaultLayout = (props: CustomRoutes) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default DefaultLayout;
