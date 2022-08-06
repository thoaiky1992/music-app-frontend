import { MusicEntity } from "@/entities/music.entity";
import { FC } from "react";
import TopMusicItem from "./TopMusicItem";

interface TopMusicListProps {
  songs: Array<MusicEntity>;
}

const TopMusicList: FC<TopMusicListProps> = ({ songs }) => {
  return (
    <>
      <div className="top-music-1 w-full flex flex-col lg:pr-1">
        {songs.slice(0, 5).map((song: MusicEntity, index: number) => (
          <TopMusicItem key={song._id} song={song} index={index + 1} />
        ))}
      </div>
      <div className="top-music-2 w-full flex flex-col lg:pl-1">
        {songs.slice(5, 10).map((song: MusicEntity, index: number) => (
          <TopMusicItem key={song._id} song={song} index={index + 6} />
        ))}
      </div>
    </>
  );
};
export default TopMusicList;
