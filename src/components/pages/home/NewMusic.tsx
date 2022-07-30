import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import SwiperActionInput from "@/components/shared/SwiperActionInput";
import {
  DocumentAddIcon,
  DotsVerticalIcon,
  HeartIcon,
  PlayIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const NewMusic = () => {
  const swiperBreakPoints = {
    1: {
      slidesPerView: 2,
      spaceBetween: 2,
    },
    320: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 5,
    },
    1900: {
      slidesPerView: 8,
    },
  };

  return (
    <div className="w-full new-music">
      <div className="w-full relative overflow-hidden text-text-2 max-w-[calc(100vw_-_40px)] lg:max-w-[calc(100vw_-_290px)] mt-2">
        <Swiper
          spaceBetween={10}
          breakpoints={swiperBreakPoints}
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          <div className="w-full flex items-center absolute left-0 top-0">
            <h1 className="text-2xl">New Music</h1>
            <div className="flex-1 h-[4px] border-t-[1px] border-b-[1px] border-text-1 mx-5"></div>
            <SwiperActionInput type="prev" />
            <SwiperActionInput type="next" />
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <SwiperSlide key={item}>
              <div className="flex flex-col relative group cursor-pointer">
                <div className="absolute left-0 top-0 h-[150px] md:h-[200px] w-full bg-transparent group-hover:bg-primary opacity-100 group-hover:opacity-50 rounded-lg flex justify-center items-center transition-all ease-in-out"></div>
                <div className="absolute left-0 top-0 h-[150px] md:h-[200px] w-full bg-transparent rounded-lg flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300">
                  <PlayIcon className="w-14 h-14 text-high-light scale-180 group-hover:scale-100 transition-all ease-in-out duration-300" />
                </div>
                <div className="absolute top-2 right-1 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300">
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
                      <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y rounded-md bg-primary shadow-lg border-t-[1px] border-text-1 shadow-text-1 ring-opacity-5 focus:outline-none">
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
                <img
                  src={item % 2 === 0 ? "son-tung.jpeg" : "karik.jpeg"}
                  alt=""
                  className="h-[150px] md:h-[200px] object-cover rounded-lg"
                />
              </div>
              <h1 className="mt-1 px-1">Nơi này có anh</h1>
              <span className="text-xs px-1">Sơn từng MTP</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default NewMusic;
