import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import SwiperActionInput from "@/components/shared/SwiperActionInput";
import { PauseIcon, PlayIcon } from "@heroicons/react/outline";
import DropDownMusicOptions from "@/components/shared/DropdownMusicOptions";
import { IS_TOOGLE_PLAY, SWIPER_NEW_MUSIC_BREAK_POINTS } from "@/constants";
import { MusicEntity } from "@/entities/music.entity";
import { FC } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store/configStore";
import { ADD_SONG_TO_PLAY_LIST } from "@/constants";
interface NewMusicListProps {
  musics: Array<MusicEntity>;
}

const NewMusicList: FC<NewMusicListProps> = ({ musics }) => {
  const dispatch = useAppDispatch();
  const playListStore = useAppSelector((state: RootState) => state.playList);

  /**
   * handle add song to playlist or pause when it's running
   * @param song MusicEntity
   */
  const handlePlaySong = (song: MusicEntity) => {
    if (song._id === playListStore.list[playListStore.index]._id) {
      return dispatch({ type: IS_TOOGLE_PLAY });
    }
    dispatch({
      type: ADD_SONG_TO_PLAY_LIST,
      payload: { songs: [song] },
    });
  };

  /**
   * handle pause song
   */
  const handlePauseSong = () => {
    dispatch({ type: IS_TOOGLE_PLAY });
  };

  const addListToPlayList = () => {
    dispatch({
      type: ADD_SONG_TO_PLAY_LIST,
      payload: { songs: musics },
    });
  };

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
        <h1 className="text-2xl" onClick={addListToPlayList}>
          New Music
        </h1>
        <div className="flex-1 h-[4px] border-t-[1px] border-b-[1px] border-text-1 mx-5"></div>
        <SwiperActionInput type="prev" />
        <SwiperActionInput type="next" />
      </div>
      {musics.map((song) => (
        <SwiperSlide key={song._id}>
          <div className="flex flex-col relative group cursor-pointer">
            <div className="absolute left-0 top-0 h-[150px] md:h-[200px] w-full bg-transparent group-hover:bg-primary opacity-100 group-hover:opacity-50 rounded-lg flex justify-center items-center transition-all ease-in-out"></div>
            <div className="absolute left-0 top-0 h-[150px] md:h-[200px] w-full bg-transparent rounded-lg flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300">
              {playListStore.list[playListStore.index]._id === song._id &&
              playListStore.isPlay ? (
                <PauseIcon
                  className="w-14 h-14 text-high-light scale-180 group-hover:scale-100 transition-all ease-in-out duration-300"
                  onClick={handlePauseSong}
                />
              ) : (
                <PlayIcon
                  className="w-14 h-14 text-high-light scale-180 group-hover:scale-100 transition-all ease-in-out duration-300"
                  onClick={() => handlePlaySong(song)}
                />
              )}
            </div>
            <div className="absolute top-2 right-1 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300">
              <DropDownMusicOptions id={song._id} />
            </div>
            <img
              src={song.image}
              alt=""
              className="h-[150px] md:h-[200px] object-cover rounded-lg"
            />
          </div>
          <h1 className="mt-1 px-1 text-baseline-clamp-2">{song.title}</h1>
          <span className="text-xs px-1 line-clamp-1">{song.artists}</span>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default NewMusicList;
