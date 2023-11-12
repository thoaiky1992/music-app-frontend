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
import { CustomHead } from "./components/shared/CustomHead";
import { URL } from "./constants";
const headData = {
  title: "KySomaio Music App",
  description: "Ứng dụng nghe nhạc trực tuyến",
  iamgePath: "/banner.png",
  url: URL,
};
function App() {
  return (
    <HistoryRouter history={history}>
      <CustomHead {...headData} />
      <Routes>
        {RouteList.map((route: CustomRoutes) => RecursiveRoute(route))}
      </Routes>
    </HistoryRouter>
  );
}

export default App;
