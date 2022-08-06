import { GenreEntity } from "@/entities/genre.entity";
import { MusicEntity } from "@/entities/music.entity";
import { FC } from "react";

interface GenreDetailListProps {
  songs: Array<MusicEntity>;
}

const GenreDetailList: FC<GenreDetailListProps> = ({ songs }) => {
  return (
    <div className="w-full text-text-2">
      <div className="w-full flex items-center">
        <h1 className="text-xl lg:text-2xl">
          {(songs[0].genre as GenreEntity).name}
        </h1>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 3xl:grid-cols-4 mt-5">
        {songs.map((song) => (
          <div
            key={song._id}
            className="pt-[30%] object-cover rounded-lg overflow-hidden bg-slate-500 lg:mr-5 mb-5 relative animate-pulse-opacity"
          >
            <figure className="absolute left-0 top-0 w-full h-full overflow-hidden bg-gradient-to-r from-app to-text-2 animate-pulse-opacity"></figure>
          </div>
        ))}
      </div>
      <div className="w-full pb-48 lg:pb-24"></div>
    </div>
  );
};
export default GenreDetailList;
