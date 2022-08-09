import { useLocalStorage } from "@/composables/useLocalStorage";
import { PLAY_LIST_HISTORY } from "@/constants";
import { MusicEntity } from "@/entities/music.entity";
import { Menu, Transition } from "@headlessui/react";
import {
  DocumentAddIcon,
  DotsVerticalIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
import { FC, Fragment } from "react";
import { MdDelete } from "react-icons/md";

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
  const handleDelete = () => {
    if (type === "localStorage") {
      const playPlistStorage = useLocalStorage(PLAY_LIST_HISTORY);
      const playListHistory: MusicEntity[] = playPlistStorage.getItem();
      playPlistStorage.setItem(
        playListHistory.filter((song) => song._id !== id)
      );
    }
  };

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
            "absolute z-10 right-5 translate-y-[-35%] mt-2 w-[160px] origin-top-right divide-y rounded-md bg-primary shadow-lg border-t-[1px] border-text-2 shadow-text-1 ring-opacity-5 focus:outline-none",
            { "!translate-y-[-100%]": isVerticalLastItem }
          )}
        >
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-high-light text-white" : "text-text-2"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all duration-200 ease-in-out`}
                >
                  <DocumentAddIcon className="w-5 mr-2" />
                  <span className="text-xs">Thên vào thư viện</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-high-light text-white" : "text-text-2"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all mt-1 duration-200 ease-in-out`}
                >
                  <HeartIcon className="w-5 mr-2" />
                  <span className="text-xs">Thích</span>
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
