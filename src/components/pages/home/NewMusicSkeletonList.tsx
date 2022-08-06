import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import SwiperActionInput from "@/components/shared/SwiperActionInput";
import { SWIPER_NEW_MUSIC_BREAK_POINTS } from "@/constants";

const NewMusicSkeletonList = () => {
  return (
    <Swiper
      spaceBetween={10}
      breakpoints={SWIPER_NEW_MUSIC_BREAK_POINTS}
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
    >
      <div className="w-full flex items-center absolute left-0 top-0">
        <h1 className="text-2xl">Mới cập nhật</h1>
        <div className="flex-1 h-[4px] border-t-[1px] border-b-[1px] border-text-1 mx-5"></div>
        <SwiperActionInput type="prev" />
        <SwiperActionInput type="next" />
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 9, 10].map((item) => (
        <SwiperSlide key={item}>
          <div className="h-[150px] md:h-[200px] object-cover rounded-lg overflow-hidden bg-slate-500 animate-pulse-opacity">
            <figure className="relative h-[150px] md:h-[200px] overflow-hidden bg-gradient-to-r from-app to-text-2 animate-pulse-opacity"></figure>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default NewMusicSkeletonList;
