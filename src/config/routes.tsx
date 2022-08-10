import GenreDetailPage from "@/components/pages/genre/detail/GenreDetail";
import GenrePage from "@/components/pages/genre/GenrePage";
import HomePage from "@/components/pages/home/HomePage";
import MusicPage from "@/components/pages/music/MusicPage";
import SearchMusicPage from "@/components/pages/music/SearchMusicPage";
import MyLibraryPage from "@/components/pages/my_library/MyLibraryPage";
import AppLayout from "@/layouts/AppLayout";
import { ReactElement } from "react";

export enum LayoutTypes {
  APP,
}

export interface CustomRoutes {
  path?: string;
  isAuth?: boolean;
  layout?: LayoutTypes;
  element: ReactElement;
  index?: boolean;
  children?: CustomRoutes[];
}

export const RouteList: CustomRoutes[] = [
  // -----------  Home -----------
  {
    path: "/",
    element: <AppLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },

  // ----------- Genre  -----------
  {
    path: "the-loai",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <GenrePage />,
      },
      {
        path: ":id",
        element: <GenreDetailPage />,
      },
    ],
  },

  // ----------- Music  -----------
  {
    path: "bai-hat",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <MusicPage />,
      },
      {
        path: "search",
        element: <SearchMusicPage />,
      },
    ],
  },

  // ----------- My library  -----------
  {
    path: "thu-vien",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <MyLibraryPage />,
      },
    ],
  },
];
