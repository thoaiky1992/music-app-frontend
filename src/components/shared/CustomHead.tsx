import { FC } from "react";
import { Helmet } from "react-helmet";

export type CustomHeadType = {
  title: string;
  description: string;
  iamgePath: string;
  url: string;
};

export const CustomHead: FC<CustomHeadType> = ({
  title,
  description,
  iamgePath,
  url,
}) => {
  return (
    <Helmet>
      <title>KySomaio Music App</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <meta name="title" content="KySomaio Music App" />
      <meta name="description" content="Ứng dụng nghe nhạc trực tuyến" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://thoaiky.com" />
      <meta property="og:title" content="KySomaio Music App" />
      <meta property="og:description" content="Ứng dụng nghe nhạc trực tuyến" />
      <meta property="og:image" content="/banner.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://thoaiky.com" />
      <meta property="twitter:title" content="KySomaio Music App" />
      <meta property="twitter:description" content="Ứng dụng nghe nhạc trực tuyến" />
      <meta property="twitter:image" content="/banner.png" />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="KySomaio Music" />
      <meta name="apple-mobile-web-app-title" content="KySomaio Music" />
      <meta name="theme-color" content="#f43f5e" />
      <meta name="msapplication-navbutton-color" content="#f43f5e" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="msapplication-starturl" content="/" />
    </Helmet>
  );
};
