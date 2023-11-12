import DropDownMusicOptions from "@/components/shared/DropdownMusicOptions";
import {
  ADD_SONG_TO_PLAY_LIST,
  IS_TOOGLE_PLAY,
  UPDATE_INDEX,
} from "@/constants";
import { MusicEntity } from "@/entities/music.entity";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { PauseIcon, PlayIcon, XIcon } from "@heroicons/react/outline";
import { FC } from "react";
import IconPlayingGif from "@/assets/images/icon-playing.gif";
import classNames from "classnames";

interface SongPlayListHistoryItemProps {
  song: MusicEntity;
  index?: number;
  isLastItem?: boolean;
}

const SongPlayListHistoryItem: FC<SongPlayListHistoryItemProps> = ({
  song,
  index = 0,
  isLastItem,
}) => {
  const dispatch = useAppDispatch();
  const playListStore = useAppSelector((state: RootState) => state.playList);

  /**
   * handle add song to playlist or pause when it's running
   * @param song MusicEntity
   */
  const handlePlaySong = (song: MusicEntity, index: number) => {
    if (song._id === playListStore.list[playListStore.index]._id) {
      return dispatch({ type: IS_TOOGLE_PLAY });
    }
    dispatch({
      type: ADD_SONG_TO_PLAY_LIST,
      payload: { songs: [song], isOpenPlayListModal: true },
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
      data-index={song._id}
      className={classNames(
        "modal-play-list__item relative min-h-[60px] w-full text-text-2 rounded-md bg-third bg-opacity-90 py-3 px-3 lg:px-2 flex items-center mt-2 group transition-all ease-in-out duration-200",
        {
          "bg-high-light text-white":
            song._id === playListStore.list[playListStore.index]._id,
          "hover:bg-text-1 hover:text-white":
            song._id !== playListStore.list[playListStore.index]._id,
        }
      )}
    >
      <div className="flex-1 flex items-center">
        <figure className="relative flex justify-center items-center mr-3 ml-1">
          <img
            src={song.image}
            className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] object-cover rounded"
            alt=""
          />
          <div className="absolute left-0 top-0 w-full h-full bg-primary opacity-40 rounded"></div>
          <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
            {playListStore.list[playListStore.index]._id === song._id &&
            playListStore.isPlay ? (
              <img
                src={IconPlayingGif}
                className="w-3 h-3 cursor-pointer"
                onClick={handlePauseSong}
              />
            ) : (
              <PlayIcon
                className="w-5 h-5 text-white scale-0 group-hover:scale-100 transition-all ease-in-out duration-200 cursor-pointer"
                onClick={() => handlePlaySong(song, index)}
              />
            )}
          </div>
        </figure>
        <div className="flex flex-col justify-between space-y-2">
          <span className="font-bold line-clamp-1 text-xs lg:text-md">
            {song.title}
          </span>
          <span className="text-[10px]">{song.artists} </span>
        </div>
      </div>
      <div className="flex items-center">
        <DropDownMusicOptions
          id={song._id}
          isDelete
          type={"localStorage"}
          isVerticalLastItem={isLastItem}
        />
      </div>
    </div>
  );
};
export default SongPlayListHistoryItem;
