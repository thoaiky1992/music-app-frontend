import TopMusicItem from "@/components/pages/home/TopMusicItem";
import { IS_TOGGLE_PLAY_PLIST_MODAL } from "@/constants";
import { MusicEntity } from "@/entities/music.entity";
import { useAppDispatch } from "@/store/configStore";
import { XIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { FC, useState } from "react";
import SongPlayListModalItem from "./SongPlayListModelItem";

interface SongPlayListModalProps {
  songs: Array<MusicEntity>;
  open: boolean;
}

const SongPlayListModal: FC<SongPlayListModalProps> = ({ songs, open }) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={classNames(
        "modal-play-list h-[400px] lg:h-[calc(100vh_-_200px)] duration-300 opacity-0 translate-y-[-100%] translate-x-[110%] transition-all ease-in-out absolute z-20 top-0 flex flex-col p-5 right-0  border-t-[1px] border-text-2 min-w-[320px] lg:min-w-[400px] w-full max-w-screen lg:max-w-[400px] bg-primary rounded-t-xl",
        { "!translate-x-[0%] opacity-100": open }
      )}
    >
      <div className="mb-5 text-text-2 flex justify-between">
        <h1>Đang phát</h1>
        <div
          className=" p-1 rounded-full bg-text-1 cursor-pointer"
          onClick={() => dispatch({ type: IS_TOGGLE_PLAY_PLIST_MODAL })}
        >
          <XIcon className="h4 w-4 text-white" />
        </div>
      </div>
      <div className="top-music-1 flex-1 w-full flex flex-col lg:pr-1 overflow-y-scroll pb-2">
        {songs.map((song: MusicEntity, index: number) => (
          <SongPlayListModalItem key={song._id} song={song} index={index} />
        ))}
      </div>
    </div>
  );
};
export default SongPlayListModal;
