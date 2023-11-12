import { MusicEntity } from "@/entities/music.entity";
import { FC } from "react";
import TopMusicItem from "./TopMusicItem";

interface TopMusicListProps {
  songs: Array<MusicEntity>;
  isHiddenIconPlay?: boolean;
}

const TopMusicList: FC<TopMusicListProps> = ({ songs, isHiddenIconPlay = false }) => {
  return (
    <>
      <div className="top-music-1 w-full flex flex-col lg:pr-1">
        {songs.slice(0, 5).map((song: MusicEntity, index: number) => (
          <TopMusicItem isHiddenIconPlay={isHiddenIconPlay} key={song._id} song={song} index={index + 1} />
        ))}
      </div>
      <div className="top-music-2 w-full flex flex-col lg:pl-1">
        {songs.slice(5, 10).map((song: MusicEntity, index: number) => (
          <TopMusicItem isHiddenIconPlay={isHiddenIconPlay} key={song._id} song={song} index={index + 6} />
        ))}
      </div>
    </>
  );
};
export default TopMusicList;
