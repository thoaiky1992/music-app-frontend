import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
} from "@heroicons/react/outline";
import { PlayIcon } from "@heroicons/react/solid";
import { FaRandom } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { RiPlayListFill } from "react-icons/ri";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { ChangeEvent, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
const audio = new Audio("anh-la-cua-em.mp3");

const ControlMusic = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [play, setPlay] = useState<boolean>(false);

  const progressRef = useRef<any>(null);
  const progressMobileRef = useRef<any>(null);
  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    if (isMobile) progressMobileRef.current.value = e.target.value;
    else progressRef.current.value = e.target.value;
  };
  const handlePlayAndPauseAudio = () => {
    if (play) {
      audio.pause();
      setPlay(false);
    } else {
      audio.play();
      setPlay(true);
    }
  };
  return (
    <div className="h-[150px] md:h-[80px] w-full fixed z-50 bottom-0 left-0 bg-primary flex justify-center shadow shadow-text-2">
      <div className="absolute left-0 -top-1 lg:-top-2 w-full progress-area flex-1 h-1 lg:h-2 rounded-lg bg-text-2">
        <div className="progress-bar w-1/2 h-full bg-gradient-to-r from-[rgb(255,85,62)] to-[rgb(255,0,101)] rounded-lg"></div>
      </div>
      <div className="w-full max-w-screen-xl flex">
        <div className="hidden md:flex flex-1 items-center px-3">
          <div>
            <img
              src="karik.jpeg"
              className="w-14 h-14 rounded-full object-cover"
              alt=""
            />
          </div>
          <div className="flex flex-col text-text-2 ml-3">
            <h1 className="text-lg line-clamp-1">Anh là của em</h1>
            <h5 className="text-sm">Karik</h5>
          </div>
          <div></div>
        </div>
        <div className="w-full lg:w-[480px] max-w-[425px] flex flex-col items-center px-3">
          <div className="flex w-full text-text-2 mx-3 md:hidden h-[75px] items-center justify-between">
            <div className="flex items-center">
              <img
                src="karik.jpeg"
                className={`w-14 h-14 rounded-full object-cover animate-spin-slow ${
                  !play && "animation-pause"
                }`}
                alt=""
              />
              <div className="flex flex-col text-text-2 ml-3 space-y-1">
                <h1 className="text-xs lg:text-lg line-clamp-1">
                  Anh là của em
                </h1>
                <h5 className="text-[10px] lg:text-sm">Karik</h5>
              </div>
            </div>
            <div>
              <div className="w-full flex items-center pl-3">
                <BsFillVolumeUpFill className="w-4 h-4 lg:w-6 lg:h-6 text-text-2 mr-2" />
                <div className="slider">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    onInput={handleChangeVolume}
                  />
                  <progress ref={progressMobileRef} max={100} value={50} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center h-[80px]">
            <div className="flex items-center">
              <div className="flex h-10 w-10 rounded-full bg-third justify-center items-center text-white bg-gradient-to-r from-[rgb(255,85,62)] to-[rgb(255,0,101)]">
                <ChevronLeftIcon className="w-5 h-5" />
              </div>
              <div className="flex h-14 w-14 mx-2 rounded-full bg-third justify-center items-center text-white bg-gradient-to-r from-[rgb(255,85,62)] to-[rgb(255,0,101)]">
                {!play ? (
                  <PlayIcon
                    className="w8 h-8"
                    onClick={handlePlayAndPauseAudio}
                  />
                ) : (
                  <PauseIcon
                    className="w8 h-8"
                    onClick={handlePlayAndPauseAudio}
                  />
                )}
              </div>
              <div className="flex h-10 w-10 rounded-full bg-third justify-center items-center text-white bg-gradient-to-r from-[rgb(255,85,62)] to-[rgb(255,0,101)]">
                <ChevronRightIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center justify-between flex-1 ml-5">
              <div className="px-3 flex items-center">
                <span className="text-xs lg:text-base text-text-2">00:00</span>
                <span className="text-xs lg:text-base text-text-2">/</span>
                <span className="text-xs lg:text-base text-text-2">04:30</span>
              </div>
              <div className="">
                <FaRandom className="w-4 h-4 lg:w-5 lg:h-5 text-text-2" />
              </div>
              <div className="px-3">
                <FiRepeat className="w-4 h-4 lg:w-5 lg:h-5 text-text-2" />
              </div>
              <div className="lg:hidden">
                <RiPlayListFill className="w-4 h-4 lg:w-5 lg:h-5 text-text-2" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 items-center justify-between">
          <div className="w-full flex items-center pl-3">
            <BsFillVolumeUpFill className="w-4 h-4 lg:w-6 lg:h-6 text-text-2 mr-2" />
            <div className="slider">
              <input
                type="range"
                min={0}
                max={100}
                onInput={handleChangeVolume}
              />
              <progress ref={progressRef} max={100} value={50} />
            </div>
          </div>
          <div>
            <RiPlayListFill className="w-4 h-4 lg:w-5 lg:h-5 text-text-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ControlMusic;
