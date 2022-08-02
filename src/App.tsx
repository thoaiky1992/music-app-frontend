import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { history } from "./config/history";

import "@/styles/global.scss";
import "animate.css";
import "swiper/css";

import { CustomRouteProps, RouteList } from "./config/routes";
import CustomLayout from "./layouts/CustomLayout";

function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        {RouteList.map((route: CustomRouteProps, index: number) => {
          return (
            <Route key={index} element={<CustomLayout {...route} />}>
              <Route path={route.path} element={route.element} />
            </Route>
          );
        })}
      </Routes>
    </HistoryRouter>
  );
}

export default App;
