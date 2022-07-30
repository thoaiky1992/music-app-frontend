import { CustomRouteProps, LayoutTypes } from "@/config/routes";
import { RootState, useAppSelector } from "@/store/configStore";
import { Navigate } from "react-router";
import AppLayout from "./AppLayout";
import DefaultLayout from "./DefaultLayout";

const CustomLayout = (props: CustomRouteProps) => {
  const userStore = useAppSelector((state: RootState) => state.user);

  if (props.isAuth && !userStore.user) {
    return <Navigate to="/login" />;
  }
  switch (props?.layout) {
    case LayoutTypes.APP:
      return <AppLayout {...props} />;
    default:
      return <DefaultLayout {...props} />;
  }
};
export default CustomLayout;
