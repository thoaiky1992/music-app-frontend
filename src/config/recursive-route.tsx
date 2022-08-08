import { Route } from "react-router-dom";
import { CustomRoutes } from "./routes";

export const RecursiveRoute = (route: CustomRoutes) => {
  return (
    <Route
      key={new Date().getTime()}
      index={route.index}
      path={route.path}
      element={route.element}
    >
      {route?.children?.map((child) => RecursiveRoute(child))}
    </Route>
  );
};
