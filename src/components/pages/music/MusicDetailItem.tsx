import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import SwiperActionInput from "@/components/shared/SwiperActionInput";
import { PauseIcon, PlayIcon } from "@heroicons/react/outline";
import DropDownMusicOptions from "@/components/shared/DropdownMusicOptions";
import { IS_TOOGLE_PLAY, SWIPER_NEW_MUSIC_BREAK_POINTS } from "@/constants";
import { MusicEntity } from "@/entities/music.entity";
import { FC, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { ADD_SONG_TO_PLAY_LIST } from "@/constants";
import IconPlayingGif from "@/assets/images/icon-playing.gif";
import classNames from "classnames";
import { HeartIcon } from "@heroicons/react/solid";
import { FaAssistiveListeningSystems } from "react-icons/fa";

interface MusicDetailItemProps {
  song: MusicEntity;
}

const MusicDetailItem: FC<MusicDetailItemProps> = ({ song }) => {
  const dispatch = useAppDispatch();
  const playListStore = useAppSelector((state: RootState) => state.playList);

  /**
   * handle add song to playlist or pause when it's running
   * @param song MusicEntity
   */
  const handlePlaySong = (song: MusicEntity) => {
    if (song._id === playListStore.list[playListStore.index]._id) {
      return dispatch({ type: IS_TOOGLE_PLAY });
    }
    dispatch({
      type: ADD_SONG_TO_PLAY_LIST,
      payload: { songs: [song] },
    });
  };

  /**
   * handle pause song
   */
  const handlePauseSong = () => {
    dispatch({ type: IS_TOOGLE_PLAY });
  };
  return (
    <div className="w-full">
      <div className="flex flex-col relative group cursor-pointer lg:h-[350px]">
        <div className="absolute z-10 left-0 top-0 h-[250px] lg:h-[350px] w-full bg-transparent group-hover:bg-primary opacity-100 group-hover:opacity-50 rounded-lg flex justify-center items-center transition-all ease-in-out"></div>
        <div className="absolute z-20 left-0 top-0 h-[250px] lg:h-[350px] w-full bg-transparent rounded-lg flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300">
          {playListStore.list[playListStore.index]._id === song._id && playListStore.isPlay ? (
            <PauseIcon
              className="w-14 h-14 text-high-light scale-180 group-hover:scale-100 transition-all ease-in-out duration-300"
              onClick={handlePauseSong}
            />
          ) : (
            <PlayIcon
              className="w-14 h-14 text-high-light scale-180 group-hover:scale-100 transition-all ease-in-out duration-300"
              onClick={() => handlePlaySong(song)}
            />
          )}
        </div>
        <figure className="relative z-0 h-[250px] lg:h-[350px]">
          {playListStore.list[playListStore.index]._id === song._id && playListStore.isPlay && (
            <div className={classNames("absolute w-full h-full flex justify-center items-center group-hover:hidden")}>
              <img src={IconPlayingGif} className="w-8 h-8" alt="" />
            </div>
          )}
          <img src={song.image} alt="" className="h-[250px] lg:h-[350px] w-full object-cover rounded-lg" />
        </figure>
        <div className="absolute z-30 top-2 right-1 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300">
          <DropDownMusicOptions id={song._id} />
        </div>
      </div>
      <h1 className="mt-1 px-1 text-sm lg:text-base line-clamp-2">{song.title}</h1>
      <span className="text-xs px-1 line-clamp-1">{song.artists}</span>
      <div className="flex mt-2">
        <div className="flex items-center mr-5">
          <HeartIcon className="w-6 h-6 text-high-light group-hover:text-white transition-all ease-in-out duration-300 mr-1 group-hover:animate-scale-image" />
          <div className="pt-[2px] group-hover:animate-scale-image">{song.likes}</div>
        </div>
        <div className="flex items-center">
          <FaAssistiveListeningSystems className="w-5 h-5 text-high-light group-hover:text-white transition-all ease-in-out duration-300 mr-1 group-hover:animate-scale-image" />
          <div className="pt-[2px] group-hover:animate-scale-image">{song.views}</div>
        </div>
      </div>
    </div>
  );
};
export default MusicDetailItem;
