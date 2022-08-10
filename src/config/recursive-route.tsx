import { Route } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { CustomRoutes } from "./routes";

export const RecursiveRoute = (route: CustomRoutes) => {
  return (
    <Route
      key={new Date().getTime()}
      index={route.index}
      path={route.path}
      element={
        <ProtectedRoute isAuth={route.isAuth}>{route.element}</ProtectedRoute>
      }
    >
      {route?.children?.map((child) => RecursiveRoute(child))}
    </Route>
  );
};
