import { RootState, useAppSelector } from "@/store/configStore";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuth?: boolean;
  children: ReactElement;
}

export const ProtectedRoute = ({ isAuth, children }: ProtectedRouteProps) => {
  const userStore = useAppSelector((state: RootState) => state.user);
  if (isAuth && !userStore.user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
