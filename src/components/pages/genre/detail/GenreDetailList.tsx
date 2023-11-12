import SongDetailItem from "@/components/shared/SongDetailItem";
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
        <div className="flex-1 h-[4px] border-t-[1px] border-b-[1px] border-text-1 mx-5"></div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 3xl:grid-cols-4 mt-5">
        {songs.map((song) => (
          <div
            key={song._id}
            className="pt-[30%] object-cover rounded-lg  lg:mr-5 mb-5 relative"
          >
            <SongDetailItem song={song} />
          </div>
        ))}
      </div>
      <div className="w-full pb-48 lg:pb-24"></div>
    </div>
  );
};
export default GenreDetailList;
