import { MusicEntity } from "@/entities/music.entity";
import { FC } from "react";
import DropDownMusicOptions from "@/components/shared/DropdownMusicOptions";
import { ADD_SONG_TO_PLAY_LIST, IS_TOOGLE_PLAY } from "@/constants";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { HeartIcon } from "@heroicons/react/solid";
import { FaAssistiveListeningSystems } from "react-icons/fa";
import IconPlayingGif from "@/assets/images/icon-playing.gif";
import { PlayIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

interface SongDetailItemProps {
  song: MusicEntity;
}
const SongDetailItem: FC<SongDetailItemProps> = ({ song }) => {
  const dispatch = useAppDispatch();
  const playListStore = useAppSelector((state: RootState) => state.playList);

  /**
   * handle add song to playlist or pause when it's running
   * @param song MusicEntity
   */
  const handlePlaySong = () => {
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
    <div
      key={song._id}
      className="absolute h-full w-full left-0 top-0 rounded-md bg-third bg-opacity-90 p-3 flex items-start group hover:bg-high-light hover:text-white transition-all ease-in-out duration-300"
    >
      <div
        className="w-[calc(30%_-_12px)] pt-[calc(30%_-_12px)] rounded-lg bg-cover bg-no-repeat group-hover:animate-scale-image relative"
        style={{ backgroundImage: `url(${song.image})` }}
      >
        {playListStore.list[playListStore.index]._id === song._id && playListStore.isPlay && (
          <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center group-hover:opacity-0 transition-all ease-in-out">
            <img src={IconPlayingGif} className="w-6 h-6 cursor-pointer" alt="" onClick={handlePauseSong} />
          </div>
        )}
        <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ease-in-out">
          <div className="absolute w-full h-full left-0 top-0 bg-app opacity-50 rounded-lg"></div>
          <div className="absolute w-full h-full left-0 top-0 bg-transparent flex justify-center items-center rounded-lg">
            {playListStore.list[playListStore.index]._id === song._id && playListStore.isPlay ? (
              <img src={IconPlayingGif} className="w-6 h-6 cursor-pointer" alt="" onClick={handlePauseSong} />
            ) : (
              <PlayIcon
                className="w-8 h-8 text-white scale-0 group-hover:scale-100 transition-all ease-in-out cursor-pointer"
                onClick={handlePlaySong}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full mx-3 justify-between">
        <div>
          <div className="line-clamp-2 text-sm font-bold text-start group-hover:animate-scale-image">
            <Link to={`/bai-hat/${song.slug}`}>{song.title}</Link>
          </div>
          <div className="text-xs mt-1 group-hover:animate-scale-image">{song.artists}</div>
        </div>
        <div className="flex">
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
      <div className="flex items-start pt-1 group-hover:animate-scale-image w-5">
        <DropDownMusicOptions id={song._id} />
      </div>
    </div>
  );
};
export default SongDetailItem;
