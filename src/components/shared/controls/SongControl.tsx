import {
  DECREMENT_INDEX,
  INCREMENT_INDEX,
  IS_TOOGLE_PLAY,
  IS_TOGGLE_REPEAT,
  IS_TOGGLE_PLAY_PLIST_MODAL,
  IS_TOGGLE_RANDOM,
} from "@/constants";
import { useAppDispatch } from "@/store/configStore";
import { FC, useCallback } from "react";
import { FaRandom } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";
import {
  IoPlayForward,
  IoPlayBack,
  IoPlayCircle,
  IoPauseCircle,
} from "react-icons/io5";
import { TbRepeatOnce } from "react-icons/tb";
import classNames from "classnames";

interface IsongTime {
  currentTime: string;
  allTime: string;
}

interface SongControlProps {
  isPlay: boolean;
  currentPlayListIndex: number;
  playListLength: number;
  songTime: IsongTime;
  isRepeat: boolean;
  isRandom: boolean;
}

const SongControl: FC<SongControlProps> = ({
  isPlay,
  songTime,
  isRepeat,
  isRandom,
}) => {
  const dispatch = useAppDispatch();

  /**
   * hanlde next or prev song
   */
  const handlePreOrNextSong = useCallback(
    (type: "next" | "pre") =>
      dispatch({ type: type === "next" ? INCREMENT_INDEX : DECREMENT_INDEX }),
    []
  );

  return (
    <div className="flex w-full items-center h-[80px]">
      <div className="flex items-center">
        <div
          className="flex h-10 w-10 rounded-full bg-third justify-center items-center text-white bg-gradient-to-r from-[rgb(255,85,62)] to-[rgb(255,0,101)] cursor-pointer"
          onClick={() => handlePreOrNextSong("pre")}
        >
          <IoPlayBack className="w-5 h-5 mr-[2px]" />
        </div>
        <div
          className="flex h-14 w-14 mx-2 outline-none rounded-full bg-third justify-center items-center text-white bg-gradient-to-r from-[rgb(255,85,62)] to-[rgb(255,0,101)] focus:outline-none cursor-pointer"
          onClick={() => dispatch({ type: IS_TOOGLE_PLAY })}
        >
          {isPlay ? (
            <IoPauseCircle className="w-8 h-8 focus:outline-none" />
          ) : (
            <IoPlayCircle className="w-8 h-8 focus:outline-none" />
          )}
        </div>
        <div
          className="flex h-10 w-10 rounded-full bg-third justify-center items-center text-white bg-gradient-to-r from-[rgb(255,85,62)] to-[rgb(255,0,101)] cursor-pointer"
          onClick={() => handlePreOrNextSong("next")}
        >
          <IoPlayForward className="w-5 h-5 ml-[2px]" />
        </div>
      </div>
      <div className="flex items-center justify-between flex-1 ml-5">
        <div className="px-3 flex items-center">
          <div className="text-xs lg:text-base text-text-2 min-w-[40px] lg:min-w-[50px] flex justify-center items-center">
            {songTime.currentTime}
          </div>
          <div className="text-xs lg:text-base text-text-2">/</div>
          <div className="text-xs lg:text-base text-text-2 min-w-[40px] lg:min-w-[50px] flex justify-center items-center">
            {songTime.allTime}
          </div>
        </div>
        <div className="">
          <FaRandom
            className={classNames(
              "w-4 h-4 lg:w-5 lg:h-5 text-text-2 cursor-pointer",
              { "text-high-light": isRandom }
            )}
            onClick={() => dispatch({ type: IS_TOGGLE_RANDOM })}
          />
        </div>
        <div className="px-3">
          <TbRepeatOnce
            className={classNames(
              "w-5 h-5 lg:w-6 lg:h-6 text-text-2 cursor-pointer",
              { "text-high-light": isRepeat }
            )}
            onClick={() => dispatch({ type: IS_TOGGLE_REPEAT })}
          />
        </div>
        <div className="lg:hidden">
          <RiPlayListFill
            className="w-4 h-4 lg:w-5 lg:h-5 text-text-2 cursor-pointer"
            onClick={() => dispatch({ type: IS_TOGGLE_PLAY_PLIST_MODAL })}
          />
        </div>
      </div>
    </div>
  );
};
export default SongControl;
