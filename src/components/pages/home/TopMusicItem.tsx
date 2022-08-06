import DropDownMusicOptions from "@/components/shared/DropdownMusicOptions";
import { ADD_SONG_TO_PLAY_LIST, IS_TOOGLE_PLAY } from "@/constants";
import { MusicEntity } from "@/entities/music.entity";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { PauseIcon, PlayIcon } from "@heroicons/react/outline";
import { FC } from "react";
import IconPlayingGif from "@/assets/images/icon-playing.gif";

interface TopMusicItemProps {
  song: MusicEntity;
  index?: number;
}

const TopMusicItem: FC<TopMusicItemProps> = ({ song, index = 0 }) => {
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
    <div
      key={song._id}
      className="top-music-1__item w-full rounded-md bg-third bg-opacity-90 py-3 px-3 lg:px-5 flex items-center mt-2 group hover:bg-high-light hover:text-white transition-all ease-in-out duration-200"
    >
      <div className="flex-1 flex items-center">
        {playListStore.list[playListStore.index]._id === song._id &&
        playListStore.isPlay ? (
          <PauseIcon
            className="w-0 group-hover:w-8  h-0 group-hover:h-8 opacity-0 group-hover:opacity-100  transition-all ease-in-out text-white duration-300 cursor-pointer"
            onClick={handlePauseSong}
          />
        ) : (
          <PlayIcon
            className="w-0 group-hover:w-8  h-0 group-hover:h-8 opacity-0 group-hover:opacity-100  transition-all ease-in-out text-white duration-300 cursor-pointer"
            onClick={() => handlePlaySong(song)}
          />
        )}
        <span className="font-bold group-hover:opacity-0 w-8 group-hover:w-0 h-8 group-hover:h-0 flex justify-center items-center transition-all ease-in-out">
          {playListStore.list[playListStore.index]._id === song._id &&
          playListStore.isPlay ? (
            <img src={IconPlayingGif} className="w-4" />
          ) : (
            index
          )}
        </span>
        <img
          src={song.image}
          className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] object-cover rounded mx-3 lg:mx-5"
          alt=""
        />
        <div className="flex flex-col justify-between space-y-2">
          <span className="font-bold line-clamp-1 text-xs lg:text-sm">
            {song.title}
          </span>
          <span className="text-[10px] lg:text-xs">{song.artists} </span>
        </div>
      </div>
      <div className="flex items-center">
        <DropDownMusicOptions id={song._id} />
      </div>
    </div>
  );
};
export default TopMusicItem;
