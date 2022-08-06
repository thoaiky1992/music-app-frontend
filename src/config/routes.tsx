import GenreDetailPage from "@/components/pages/genre/detail/GenreDetail";
import GenrePage from "@/components/pages/genre/Genre";
import Home from "@/components/pages/home/Home";
import { ReactElement } from "react";

export enum LayoutTypes {
  APP,
}

export interface CustomRouteProps {
  path: string;
  isAuth?: boolean;
  layout?: LayoutTypes;
  element: ReactElement;
}

export const RouteList: CustomRouteProps[] = [
  {
    path: "/",
    element: <Home />,
    layout: LayoutTypes.APP,
  },
  {
    path: "/the-loai",
    element: <GenrePage />,
    layout: LayoutTypes.APP,
  },
  {
    path: "/the-loai/:id",
    element: <GenreDetailPage />,
    layout: LayoutTypes.APP,
  },
];
