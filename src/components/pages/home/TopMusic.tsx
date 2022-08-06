import { MusicEntity } from "@/entities/music.entity";
import { MusicSerice } from "@/services/music.service";
import { useEffect, useState } from "react";
import TopMusicItem from "./TopMusicItem";

const TopMusic = () => {
  const [topMusics, setTopMusics] = useState<MusicEntity[]>([]);

  useEffect(() => {
    const musicService = MusicSerice.getInstance();
    (async () => {
      const result = await musicService
        .findOptions({ sort: [["views", -1]], skip: 0, limit: 10 })
        .getMany();
      setTopMusics(result.rows);
    })();
  }, []);

  return (
    <div className="w-full mt-5 lg:mt-10">
      <h1 className="text-2xl">Top Music</h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 mt-2">
        <div className="top-music-1 w-full flex flex-col lg:pr-1">
          {topMusics.slice(0, 5).map((song: MusicEntity, index: number) => (
            <TopMusicItem key={song._id} song={song} index={index + 1} />
          ))}
        </div>
        <div className="top-music-2 w-full flex flex-col lg:pl-1">
          {topMusics.slice(5, 10).map((song: MusicEntity, index: number) => (
            <TopMusicItem key={song._id} song={song} index={index + 6} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TopMusic;
