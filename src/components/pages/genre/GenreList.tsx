import { ADD_SONG_TO_PLAY_LIST } from "@/constants";
import { GenreEntity } from "@/entities/genre.entity";
import { MusicSerice } from "@/services/music.service";
import { useAppDispatch } from "@/store/configStore";
import { EyeIcon } from "@heroicons/react/outline";
import { PlayIcon } from "@heroicons/react/solid";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

interface GenreListProps {
  genres: Array<GenreEntity>;
}

const GenreList: FC<GenreListProps> = ({ genres }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const handlePlayAlbum = async (id: string) => {
    const musicService = MusicSerice.getInstance();
    setLoading(true);
    const data = await musicService.findOptions({ where: { genre: id } }).getMany();
    dispatch({ type: ADD_SONG_TO_PLAY_LIST, payload: { songs: data.rows } });
    setLoading(false);
  };

  return (
    <>
      {genres.map((genre) => (
        <div
          key={genre._id}
          className="pt-[70%] object-cover rounded-lg overflow-hidden bg-slate-500 lg:mr-5 mb-5 relative group"
        >
          <figure className="absolute left-0 top-0 w-full h-full cursor-pointer">
            <img
              src={genre.image}
              className="object-cover w-full h-full group-hover:scale-110 transition-all ease-in-out duration-500"
              alt=""
            />
          </figure>
          <div className="absolute left-0 top-0 bg-transparent rounded-lg flex justify-center w-full h-full scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300">
            <div className="absolute left-0 top-0 w-full h-full opacity-60 bg-third rounded-lg"></div>
            <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center rounded-lg">
              <div
                className="flex items-center p-2 bg-third rounded-lg hover:bg-high-light hover:text-white transition-all ease-in-out duration-200 group-1 cursor-pointer"
                onClick={() => handlePlayAlbum(genre._id)}
              >
                <PlayIcon className="w-5 h-5 mr-2 text-text-2 group-1-hover:text-white transition-all ease-in-out duration-200" />
                <span className="text-sm">{loading ? "Đang tải ..." : "Phát Album"}</span>
              </div>
              <Link
                to={"/the-loai/" + genre._id}
                className="flex items-center p-2 bg-third rounded-lg mt-3 hover:bg-high-light hover:text-white transition-all ease-in-out duration-200 group-2 cursor-pointer"
              >
                <EyeIcon className="w-5 h-5 mr-2 text-text-2 group-2-hover:text-white transition-all ease-in-out duration-200" />
                <span className="text-sm">Xem Album</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default GenreList;
