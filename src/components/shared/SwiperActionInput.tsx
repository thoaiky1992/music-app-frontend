import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { FC } from "react";
import { useSwiper } from "swiper/react";

interface SwiperActionInputProps {
  type: "prev" | "next";
}
const SwiperActionInput: FC<SwiperActionInputProps> = ({ type }) => {
  const swiper = useSwiper();
  const handleAction = (type: "prev" | "next") => {
    if (type === "next") swiper.slideNext();
    else swiper.slidePrev();
  };

  return (
    <div
      className="w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer mr-1 hover:bg-high-light transition-all ease-in-out hover:text-white hover:scale-80"
      onClick={() => handleAction(type)}
    >
      {type === "next" ? (
        <ChevronRightIcon className="w-6" />
      ) : (
        <ChevronLeftIcon className="w-6" />
      )}
    </div>
  );
};
export default SwiperActionInput;
