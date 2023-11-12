import { FC } from "react";
import classNames from "classnames";

interface SongInfoLaptopProps {
  title: string;
  isPlay: boolean;
  artists: string;
  image: string;
}

const SongInfoLaptop: FC<SongInfoLaptopProps> = ({
  title,
  isPlay,
  artists,
  image,
}) => {
  return (
    <div className="hidden md:flex flex-1 items-center px-3">
      <div>
        <img
          src={image}
          className={classNames(
            "w-14 h-14 rounded-full object-cover animate-spin-slow",
            { "animation-pause": !isPlay }
          )}
          alt=""
        />
      </div>
      <div className="flex flex-col text-text-2 ml-3">
        <h1 className="text-lg line-clamp-1">{title}</h1>
        <h5 className="text-sm">{artists}</h5>
      </div>
      <div></div>
    </div>
  );
};
export default SongInfoLaptop;
