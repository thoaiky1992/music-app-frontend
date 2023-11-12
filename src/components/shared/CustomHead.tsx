import { FC } from "react";
import { Helmet } from "react-helmet";

export type CustomHeadType = {
  title: string;
  description: string;
  iamgePath: string;
  url: string;
};

export const CustomHead: FC<CustomHeadType> = ({ title, description, iamgePath, url }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={url + iamgePath} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={url + iamgePath} />

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
