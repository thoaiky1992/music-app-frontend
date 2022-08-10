import {
  ADD_SONG_TO_PLAY_LIST,
  IS_TOGGLE_PLAY_PLIST_MODAL,
  PLAY_LIST_HISTORY,
} from "@/constants";
import { MusicEntity } from "@/entities/music.entity";
import { useAppDispatch } from "@/store/configStore";
import { XIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import SongPlayListModalItem from "./SongPlayListModelItem";
import { Tab } from "@headlessui/react";
import { useLocalStorage } from "@/composables/useLocalStorage";
import SongPlayListHistoryItem from "./SongPlayListHistoryItem";
import { CgPlayButtonR } from "react-icons/cg";
interface SongPlayListModalProps {
  songs: Array<MusicEntity>;
  open: boolean;
}

const SongPlayListModal: FC<SongPlayListModalProps> = ({ songs, open }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useAppDispatch();
  const playListStorage = useLocalStorage(PLAY_LIST_HISTORY);
  const [playListHistory, setPlayListHistory] = useState(
    playListStorage.getItem() || []
  );

  const handleUpdateLocalStorage = () => {
    const list = playListStorage.getItem();
    setPlayListHistory(list);
    if (!list.length) playListStorage.removeItem();
  };

  /**
   * listen the change of storage
   */
  useEffect(() => {
    window.addEventListener("storage", handleUpdateLocalStorage);

    // cleanup function
    return () => {
      window.removeEventListener("storage", handleUpdateLocalStorage);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
    }
  }, [open]);

  return (
    <div
      className={classNames(
        "modal-play-list h-[400px] lg:h-[calc(100vh_-_200px)] duration-300 opacity-0 translate-y-[-100%] translate-x-[110%] transition-all ease-in-out absolute z-20 top-0 flex flex-col p-5 right-0  border-t-[1px] border-text-2 min-w-[320px] lg:min-w-[400px] w-full max-w-screen lg:max-w-[400px] bg-primary rounded-t-xl",
        { "!translate-x-[0%] opacity-100": open }
      )}
    >
      <div
        className=" absolute right-2 top-2 p-1 rounded-full bg-text-1 cursor-pointer"
        onClick={() => dispatch({ type: IS_TOGGLE_PLAY_PLIST_MODAL })}
      >
        <XIcon className="h4 w-4 text-white" />
      </div>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="mb-5 text-text-2">
          <Tab
            className={({ selected }) =>
              classNames("text-base outline-none pb-2 mr-3 min-w-[120px]", {
                "border-b-2 border-high-light": selected,
              })
            }
          >
            Đang Phát
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames("text-base outline-none pb-2 min-w-[120px]", {
                "border-b-2 border-high-light": selected,
              })
            }
          >
            Lịch sử nghe
          </Tab>
        </Tab.List>
        <Tab.Panels className={"overflow-y-scroll h-full w-full"}>
          <Tab.Panel className="songs flex-1 w-full flex flex-col lg:pr-1">
            {songs.map((song: MusicEntity, index: number) => (
              <SongPlayListModalItem
                key={song._id}
                song={song}
                index={index}
                isLastItem={index === songs.length - 1 && index !== 0}
              />
            ))}
          </Tab.Panel>
          <Tab.Panel className="songs flex-1 w-full flex flex-col lg:pr-1">
            {!playListHistory || !playListHistory.length ? (
              <div className="w-full flex justify-center py-5 text-md">
                Không có ...
              </div>
            ) : (
              <div className="w-full">
                <div className="w-full flex mb-2">
                  <button
                    className="outline-none bg-high-light text-white px-4 py-2 rounded-md flex hover:scale-95 transition-all ease-in-out"
                    onClick={() =>
                      dispatch({
                        type: ADD_SONG_TO_PLAY_LIST,
                        payload: {
                          songs: playListHistory,
                          isOpenPlayListModal: true,
                        },
                      })
                    }
                  >
                    <CgPlayButtonR className="w-4 h-4 mr-3" />{" "}
                    <span className=" text-sm -mt-[1px]">Phát tất cả</span>
                  </button>
                </div>
                {playListHistory.map((song: MusicEntity, index: number) => (
                  <SongPlayListHistoryItem
                    key={song._id}
                    song={song}
                    index={index}
                    isLastItem={
                      index === playListHistory.length - 1 && index !== 0
                    }
                  />
                ))}
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default SongPlayListModal;
