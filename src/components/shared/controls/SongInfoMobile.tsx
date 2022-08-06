import { FC } from "react";

interface SongInfoMobileProps {
  title: string;
  artists: string;
  image: string;
  isPlay: boolean;
}

const SongInfoMobile: FC<SongInfoMobileProps> = ({
  title,
  artists,
  image,
  isPlay,
}) => {
  return (
    <div className="flex items-center">
      <img
        src={image}
        className={`w-14 h-14 rounded-full object-cover animate-spin-slow ${
          !isPlay && "animation-pause"
        }`}
        alt=""
      />
      <div className="flex flex-col text-text-2 ml-3 space-y-1">
        <h1 className="text-xs lg:text-lg line-clamp-2">{title}</h1>
        <h5 className="text-[10px] lg:text-sm"> {artists}</h5>
      </div>
    </div>
  );
};
export default SongInfoMobile;
