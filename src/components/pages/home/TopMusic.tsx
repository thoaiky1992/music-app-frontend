import { Menu, Transition } from "@headlessui/react";
import {
  DocumentAddIcon,
  DotsVerticalIcon,
  HeartIcon,
  PlayIcon,
} from "@heroicons/react/outline";
import { Fragment } from "react";

const TopMusic = () => {
  return (
    <div className="w-full mt-10">
      <h1 className="text-2xl">Top Music</h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 mt-2">
        <div className="top-music-1 w-full flex flex-col lg:pr-1">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="top-music-1__item w-full rounded-md bg-third bg-opacity-90 py-3 px-5 flex items-center mt-2 group hover:bg-high-light hover:text-white transition-all ease-in-out duration-200"
            >
              <div className="flex-1 flex items-center">
                <PlayIcon className="w-0 group-hover:w-8  h-0 group-hover:h-8 opacity-0 group-hover:opacity-100  transition-all ease-in-out text-white duration-300 cursor-pointer" />
                <span className="font-bold group-hover:opacity-0 w-8 group-hover:w-0 h-8 group-hover:h-0 flex justify-center items-center transition-all ease-in-out">
                  0{item}
                </span>
                <img
                  src="son-tung.jpeg"
                  className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] object-cover rounded mx-5"
                  alt=""
                />
                <div className="flex flex-col justify-between space-y-2">
                  <span className="font-bold line-clamp-1 text-xs lg:text-base">
                    Nơi Này Có Anh
                  </span>
                  <span className="text-[10px] lg:text-xs">Sơn Tùng MTP</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-5 text-[10px] lg:text-base">4:30</span>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex items-center cursor-pointer focus:outline-none">
                      <DotsVerticalIcon className="w-5 focus:outline-none" />
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
                    <Menu.Items className="absolute z-10 right-0 mt-2 w-40 origin-top-right divide-y rounded-md bg-primary shadow-lg border-t-[1px] border-text-1 shadow-text-1 ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-high-light text-white"
                                  : "text-text-1"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all duration-200 ease-in-out`}
                            >
                              <DocumentAddIcon className="w-5 mr-2" />
                              <span className="text-xs">Add to Playlist</span>
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-high-light text-white"
                                  : "text-text-1"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all mt-1 duration-200 ease-in-out`}
                            >
                              <HeartIcon className="w-5 mr-2" />
                              <span className="text-xs">Favorite</span>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          ))}
        </div>
        <div className="top-music-2 w-full flex flex-col lg:pl-1">
          {[6, 7, 8, 9, 10].map((item) => (
            <div
              key={item}
              className="top-music-1__item w-full rounded-md bg-third bg-opacity-90 py-3 px-5 flex items-center mt-2 group hover:bg-high-light hover:text-white transition-all ease-in-out duration-200"
            >
              <div className="flex-1 flex items-center">
                <PlayIcon className="w-0 group-hover:w-8  h-0 group-hover:h-8 opacity-0 group-hover:opacity-100  transition-all ease-in-out text-white duration-300 cursor-pointer" />
                <span className="font-bold group-hover:opacity-0 w-8 group-hover:w-0 h-8 group-hover:h-0 flex justify-center items-center transition-all ease-in-out">
                  0{item}
                </span>
                <img
                  src="karik.jpeg"
                  className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] object-cover rounded mx-5"
                  alt=""
                />
                <div className="flex flex-col justify-between space-y-2">
                  <span className="font-bold line-clamp-1 text-xs lg:text-base">
                    Anh là của em
                  </span>
                  <span className="text-[10px] lg:text-xs">Karik</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-5 text-[10px] lg:text-base">4:30</span>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex items-center cursor-pointer focus:outline-none">
                      <DotsVerticalIcon className="w-5 focus:outline-none" />
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
                    <Menu.Items className="absolute z-10 right-0 mt-2 w-40 origin-top-right divide-y rounded-md bg-primary shadow-lg border-t-[1px] border-text-1 shadow-text-1 ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-high-light text-white"
                                  : "text-text-1"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all duration-200 ease-in-out`}
                            >
                              <DocumentAddIcon className="w-5 mr-2" />
                              <span className="text-xs">Add to Playlist</span>
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-high-light text-white"
                                  : "text-text-1"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all mt-1 duration-200 ease-in-out`}
                            >
                              <HeartIcon className="w-5 mr-2" />
                              <span className="text-xs">Favorite</span>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TopMusic;
