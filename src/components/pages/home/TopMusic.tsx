import { MusicEntity } from "@/entities/music.entity";
import { MusicSerice } from "@/services/music.service";
import { useEffect, useState } from "react";
import TopMusicItem from "./TopMusicItem";
import TopMusicList from "./TopMusicList";
import TopMusicSkeleton from "./TopMusicSkeleton";

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
      <h1 className="text-xl lg:text-2xl">Top Yêu Thích</h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 mt-2">
        {topMusics.length ? (
          <TopMusicList songs={topMusics} />
        ) : (
          <TopMusicSkeleton />
        )}
      </div>
    </div>
  );
};
export default TopMusic;
