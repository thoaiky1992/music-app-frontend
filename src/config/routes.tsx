import GenreDetailPage from "@/components/pages/genre/detail/GenreDetail";
import GenrePage from "@/components/pages/genre/GenrePage";
import HomePage from "@/components/pages/home/HomePage";
import LoginPage from "@/components/pages/login/LoginPage";
import MusicDetailPage from "@/components/pages/music/MusicDetail";
import MusicPage from "@/components/pages/music/MusicPage";
import SearchMusicPage from "@/components/pages/music/SearchMusicPage";
import MyLibraryPage from "@/components/pages/my_library/MyLibraryPage";
import ProfilePage from "@/components/pages/profile/ProfilePage";
import RegistPage from "@/components/pages/regist/registPage";
import AppLayout from "@/layouts/AppLayout";
import { ReactElement } from "react";

export interface CustomRoutes {
  path?: string;
  element: ReactElement;
  isAuth?: boolean;
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
      {
        path: ":id",
        element: <MusicDetailPage />,
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
        isAuth: true,
        element: <MyLibraryPage />,
      },
    ],
  },

  // ----------- Login  -----------
  {
    path: "dang-nhap",
    element: <AppLayout />,
    children: [
      {
        index: true,
        isAuth: false,
        element: <LoginPage />,
      },
    ],
  },

  // ----------- Register  -----------
  {
    path: "dang-ky",
    element: <AppLayout />,
    children: [
      {
        index: true,
        isAuth: false,
        element: <RegistPage />,
      },
    ],
  },

  // ----------- Info  -----------
  {
    path: "thong-tin-tai-khoan",
    element: <AppLayout />,
    children: [
      {
        index: true,
        isAuth: true,
        element: <ProfilePage />,
      },
    ],
  },
];
