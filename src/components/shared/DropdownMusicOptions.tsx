import { useLocalStorage } from "@/composables/useLocalStorage";
import {
  DEFAULT,
  LOGIN_MODAL_OPEN,
  PLAY_LIST_HISTORY,
  SOCKET_LIKE_CREATED,
  SOCKET_LIKE_DELETED,
  SOCKET_MY_LIBRARY_ADD_THIS_SONG,
  SOCKET_MY_LIBRARY_REMOVE_THIS_SONG,
} from "@/constants";
import useSocketIOContext from "@/context/socket-io.context";
import { LikeEntity } from "@/entities/like.entity";
import { MusicEntity } from "@/entities/music.entity";
import { LikeService } from "@/services/like.service";
import { MyLibraryService } from "@/services/my-library.service";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon, HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as LikedHeartIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { FC, Fragment, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiFileMinus, FiFilePlus } from "react-icons/fi";
interface DropDownMusicOptionsProps {
  id: string;
  isDelete?: boolean;
  type?: "database" | "localStorage";
  isVerticalLastItem?: boolean;
}

const DropDownMusicOptions: FC<DropDownMusicOptionsProps> = ({
  isDelete,
  type = "database",
  id,
  isVerticalLastItem = false,
}) => {
  const { socket } = useSocketIOContext();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isAddSong, setIsAddSong] = useState<boolean>(false);
  const userStore = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const likeService = LikeService.getInstance();
  const myLiraryService = MyLibraryService.getInstance();

  const handleDelete = () => {
    if (type === "localStorage") {
      const playPlistStorage = useLocalStorage(PLAY_LIST_HISTORY);
      const playListHistory: MusicEntity[] = playPlistStorage.getItem();
      playPlistStorage.setItem(
        playListHistory.filter((song) => song._id !== id)
      );
    }
  };

  const handleLike = async () => {
    if (!userStore.user) return dispatch({ type: LOGIN_MODAL_OPEN });
    !isLike
      ? await likeService.createOne(id)
      : await likeService.deleleOne(id, userStore.user._id);
  };

  const handleAddSongToLibrary = async () => {
    if (!userStore.user) return dispatch({ type: LOGIN_MODAL_OPEN });
    !isAddSong
      ? await myLiraryService.createOne(id)
      : await myLiraryService.removeSong(id, userStore.user._id);
  };

  useEffect(() => {
    if (userStore.user && id && id !== DEFAULT) {
      const _user = userStore.user;
      (async () => {
        // check user already existed this song
        const isLiked = await likeService.getOne(id, _user._id);
        // check this song already existed in my library

        const isExistLibrary = await myLiraryService.checkIsExistThisSong(
          id,
          _user._id
        );
        if (isExistLibrary) setIsAddSong(true);
        if (isLiked) setIsLike(true);
      })();

      // socket listen event liked
      socket.on(SOCKET_LIKE_CREATED, (doc: LikeEntity) => {
        if (doc.user === userStore.user?._id && doc.song === id) {
          setIsLike(true);
        }
      });

      // socket listen event unliked
      socket.on(SOCKET_LIKE_DELETED, (doc: LikeEntity) => {
        if (doc.user === userStore.user?._id && doc.song === id) {
          setIsLike(false);
        }
      });

      // socket listen event add this song in to my lirary
      socket.on(SOCKET_MY_LIBRARY_ADD_THIS_SONG, (doc) => {
        if (doc.user === userStore.user?._id && doc.songs[0] === id) {
          setIsAddSong(true);
        }
      });

      // socket listen event remove this song in to my lirary
      socket.on(SOCKET_MY_LIBRARY_REMOVE_THIS_SONG, (doc) => {
        if (doc.userId === userStore.user?._id && doc.songId === id) {
          setIsAddSong(false);
        }
      });

      // cleanup
      return () => {
        socket.off(SOCKET_LIKE_CREATED);
        socket.off(SOCKET_LIKE_DELETED);
        socket.off(SOCKET_MY_LIBRARY_ADD_THIS_SONG);
        socket.off(SOCKET_MY_LIBRARY_REMOVE_THIS_SONG);
      };
    } else {
      setIsAddSong(false);
      setIsLike(false);
    }
  }, [userStore.user, id]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center cursor-pointer focus:outline-none">
          <DotsVerticalIcon className="w-5 focus:outline-none text-white" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          static
          className={classNames(
            "absolute z-10 right-5 translate-y-[-35%] mt-2 min-w-[165px] origin-top-right divide-y rounded-md bg-primary shadow-lg border-t-[1px] border-text-2 shadow-text-1 ring-opacity-5 focus:outline-none",
            { "!translate-y-[-100%]": isVerticalLastItem }
          )}
        >
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleAddSongToLibrary}
                  className={`${
                    active ? "bg-high-light text-white" : "text-text-2"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all duration-200 ease-in-out`}
                >
                  {isAddSong ? (
                    <FiFileMinus className="w-[18px] h-[18px] mr-2" />
                  ) : (
                    <FiFilePlus className="w-[18px] h-[18px] mr-2" />
                  )}
                  <span className="text-xs ml-[2px]">
                    {isAddSong ? "Xoá khỏi" : "Thêm vào"} thư viện
                  </span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLike}
                  className={classNames(
                    "group flex w-full text-text-2 items-center rounded-md px-2 py-2 text-sm transition-all mt-1 duration-200 ease-in-out group-1",
                    { "bg-high-light text-white": active }
                  )}
                >
                  {isLike ? (
                    <LikedHeartIcon className="w-5 mr-2 text-high-light group-1-hover:text-white" />
                  ) : (
                    <HeartIcon className="w-5 mr-2" />
                  )}
                  <span className="text-xs">
                    {isLike ? "Bỏ thích" : "Thích"}
                  </span>
                </button>
              )}
            </Menu.Item>
            {isDelete && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-high-light text-white" : "text-text-2"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all mt-1 duration-200 ease-in-out`}
                    onClick={handleDelete}
                  >
                    <MdDelete className="h-5 w-5 mr-2" />
                    <span className="text-xs">Xoá</span>
                  </button>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default DropDownMusicOptions;
