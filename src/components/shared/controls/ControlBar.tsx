import { RiPlayListFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import SongProgressBar from "./SongProgressBar";
import SongInfoLaptop from "./SongInfoLaptop";
import SongInfoMobile from "./SongInfoMobile";
import SongVolume from "./SongVolume";
import SongControl from "./SongControl";
import {
  DEFAULT_SONG_TIME,
  INCREMENT_INDEX,
  IS_TOGGLE_PLAY_PLIST_MODAL,
  IS_TOOGLE_PLAY,
  PLAY_LIST_HISTORY,
  UPDATE_INDEX,
} from "@/constants";
import SongPlayListModal from "./SongPlayListModal";
import { useLocalStorage } from "@/composables/useLocalStorage";
import { MusicEntity } from "@/entities/music.entity";

interface RefObject {
  handleUpdateProgressWith: (percent: number) => void;
}

interface ISongTime {
  currentTime: string;
  allTime: string;
}

const ControlBar = () => {
  const dispatch = useAppDispatch();
  const playlistStore = useAppSelector((state: RootState) => state.playList);
  const [songTime, setSongTime] = useState<ISongTime>(DEFAULT_SONG_TIME);
  const randomList = useRef<Array<number>>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<RefObject>(null);

  /**
   * hanlde Change Song Volume
   * @params percent
   */

  const handleChangeSongVolume = (percent: number) => {
    if (audioRef.current) {
      audioRef.current.volume = percent / 100;
    }
  };

  /**
   * handle Click to change Progress Width
   * @params percent
   */
  const handleChangeProgressWidth = (offsetX: number, clientWidth: number) => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      audioRef.current.currentTime = (offsetX / clientWidth) * duration;
    }
  };

  /**
   * hanlde Play Song with current index
   */
  const handlePlayCurrentSong = () => {
    if (audioRef.current && progressBarRef.current) {
      progressBarRef.current.handleUpdateProgressWith(0);
      audioRef.current.children[0].setAttribute(
        "src",
        playlistStore.list[playlistStore.index].src
      );
      audioRef.current.load();
      if (playlistStore.isPlay) {
        audioRef.current.play();
      }
    }

    // scroll to that song position playing ...
    setTimeout(() => {
      document
        .querySelector(
          `.modal-play-list > .songs > .modal-play-list__item[data-index="${
            playlistStore.list[playlistStore.index]._id
          }"]`
        )
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };

  /**
   * Listen to add songs to playlist
   **/
  useEffect(() => {
    if (playlistStore.list) {
      handlePlayCurrentSong();
    }
  }, [playlistStore.list]);

  /**
   * Listen to play/pause
   **/
  useEffect(() => {
    playlistStore.isPlay ? audioRef.current?.play() : audioRef.current?.pause();
  }, [playlistStore.isPlay]);

  /**
   * Listen to change index
   **/
  useEffect(() => {
    handlePlayCurrentSong();
  }, [playlistStore.index]);

  /**
   * handle Audio
   **/
  useEffect(() => {
    if (audioRef.current) {
      /**
       * get song time when the song just played and save save this song to the playlist history
       **/
      audioRef.current.onplaying = function () {
        if (audioRef.current && audioRef.current.duration) {
          const duration = audioRef.current.duration;
          var minutes = String(Math.floor(duration / 60)).padStart(2, "0");
          var seconds = String(Math.floor(duration % 60)).padStart(2, "0");
          setSongTime((preTime) => {
            const newSongTime = preTime;
            return { ...newSongTime, allTime: `${minutes}:${seconds}` };
          });
        }

        // get playlist history and save this song into it
        const playlistHistoryStorage = useLocalStorage(PLAY_LIST_HISTORY);
        const playlistHistory: MusicEntity[] = playlistHistoryStorage.getItem();
        if (playlistHistory && playlistHistory.length) {
          //  check this song already eixsted in the playlistHistory
          const flag = playlistHistory.some(
            (song) => song._id == playlistStore.list[playlistStore.index]._id
          );
          if (!flag) {
            playlistHistory.push(playlistStore.list[playlistStore.index]);
            playlistHistoryStorage.setItem([...playlistHistory]);
          }
        } else {
          playlistHistoryStorage.setItem([
            playlistStore.list[playlistStore.index],
          ]);
        }
      };

      /**
       * get current time of sing when the song playing
       **/
      audioRef.current.ontimeupdate = function () {
        if (audioRef.current && progressBarRef.current) {
          const currentTime = audioRef.current.currentTime;
          const duration = audioRef.current.duration;
          var minutes = String(Math.floor(currentTime / 60)).padStart(2, "0");
          var seconds = String(Math.floor(currentTime % 60)).padStart(2, "0");
          setSongTime((preTime) => ({
            ...preTime,
            currentTime: `${minutes}:${seconds}`,
          }));
          progressBarRef.current.handleUpdateProgressWith(
            (currentTime / duration) * 100
          );
        }
      };

      /**
       * handle end song
       **/
      audioRef.current.onended = function () {
        if (audioRef.current && progressBarRef.current) {
          progressBarRef.current.handleUpdateProgressWith(0);
          dispatch({ type: IS_TOOGLE_PLAY });

          /**
           * handle repeat song
           */
          if (playlistStore.isRepeat) {
            dispatch({ type: IS_TOOGLE_PLAY });
            audioRef.current.play();
            return;
          }

          /**
           * handle random song
           */
          if (playlistStore.isRandom && playlistStore.list.length > 1) {
            let index: number;
            if (!randomList.current.length) {
              randomList.current = [playlistStore.index];
            }
            // Check random index already existed in the random list
            do {
              index = Math.floor(Math.random() * playlistStore.list.length);
            } while (randomList.current.includes(index));

            randomList.current = [...randomList.current, index];
            dispatch({ type: UPDATE_INDEX, payload: { newIndex: index } });

            if (randomList.current.length === playlistStore.list.length)
              randomList.current = [];
            return;
          }

          /**
           * handle next song if length of list is than more 2
           */
          if (playlistStore.list.length > 1) {
            dispatch({ type: INCREMENT_INDEX });
          }
        }
      };
    }
  }, [playlistStore]);

  return (
    <div
      className={classNames(
        "h-[150px] md:h-[80px] w-full fixed bottom-0 left-0 bg-primary flex justify-center shadow shadow-text-2",
        { hidden: !playlistStore.isOpenControl }
      )}
      style={{ zIndex: "999999" }}
    >
      {/* Audio */}
      <audio ref={audioRef} className="hidden">
        <source src="anh-la-cua-em.mp3" />
      </audio>
      {/* End Audio */}

      {/* PlayList Modal */}
      <SongPlayListModal
        open={playlistStore.isOpenPlayListModal}
        songs={playlistStore.list}
      />
      {/* End PlayList Modal */}

      {/* Progress Bar */}
      <SongProgressBar
        ref={progressBarRef}
        handleChangeProgressWidth={handleChangeProgressWidth}
      />
      {/* End Progress Bar */}

      <div className="w-full max-w-screen-xl flex">
        {/* Song Info (Laptop) */}
        <SongInfoLaptop
          title={playlistStore.list[playlistStore.index].title}
          image={playlistStore.list[playlistStore.index].image}
          artists={playlistStore.list[playlistStore.index].artists}
          isPlay={playlistStore.isPlay}
        />
        {/* End Song Info (Laptop) */}

        <div className="w-full lg:w-[480px] max-w-[425px] flex flex-col items-center px-3">
          {/* Song Info And Volume (Mobile)  */}
          <div className="flex w-full text-text-2 mx-3 md:hidden h-[75px] items-center justify-between">
            <SongInfoMobile
              title={playlistStore.list[playlistStore.index].title}
              image={playlistStore.list[playlistStore.index].image}
              artists={playlistStore.list[playlistStore.index].artists}
              isPlay={playlistStore.isPlay}
            />
          </div>
          {/* Song Info And Volume (Mobile)  */}

          {/* Song Control */}

          <div className="flex w-full items-center h-[80px]">
            <SongControl
              isPlay={playlistStore.isPlay}
              currentPlayListIndex={playlistStore.index}
              playListLength={playlistStore.list.length}
              songTime={songTime}
              isRepeat={playlistStore.isRepeat}
              isRandom={playlistStore.isRandom}
            />
          </div>

          {/* End Song Control */}
        </div>

        {/* Volume and PlayList */}
        <div className="hidden lg:flex flex-1 items-center justify-between">
          <SongVolume handleChangeSongVolume={handleChangeSongVolume} />
          <div>
            <RiPlayListFill
              className="w-4 h-4 lg:w-5 lg:h-5 text-text-2 cursor-pointer"
              onClick={() => dispatch({ type: IS_TOGGLE_PLAY_PLIST_MODAL })}
            />
          </div>
        </div>
        {/* Volume and PlayList */}
      </div>
    </div>
  );
};
export default ControlBar;
