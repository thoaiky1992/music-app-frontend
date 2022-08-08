import { Menu, Transition } from "@headlessui/react";
import {
  DocumentAddIcon,
  DotsVerticalIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { FC, Fragment } from "react";

interface DropDownMusicOptionsProps {
  id: string;
}

const DropDownMusicOptions: FC<DropDownMusicOptionsProps> = () => {
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
        <Menu.Items className="absolute z-10 right-0 mt-2 w-[160px] origin-top-right divide-y rounded-md bg-primary shadow-lg border-t-[1px] border-text-2 shadow-text-1 ring-opacity-5 focus:outline-none">
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
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default DropDownMusicOptions;
