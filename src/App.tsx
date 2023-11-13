import {
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { history } from "./config/history";

import "@/styles/global.scss";
import "animate.css";
import "swiper/css";

import { CustomRoutes, RouteList } from "./config/routes";
import { RecursiveRoute } from "./config/recursive-route";

function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        {RouteList.map((route: CustomRoutes) => RecursiveRoute(route))}
      </Routes>
    </HistoryRouter>
  );
}

export default App;
