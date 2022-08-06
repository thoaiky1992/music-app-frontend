import { useEffect, useState } from "react";
import { MusicEntity } from "@/entities/music.entity";
import { MusicSerice } from "@/services/music.service";
import NewMusicList from "./NewMusicList";
import NewMusicSkeletonList from "./NewMusicSkeletonList";

const NewMusic = () => {
  const [newMusics, setNewMusics] = useState<MusicEntity[]>([]);

  useEffect(() => {
    const musicService = MusicSerice.getInstance();
    (async () => {
      const result = await musicService
        .findOptions({ sort: [["createdAt", -1]] })
        .getMany();
      setNewMusics(result.rows);
    })();
  }, []);

  return (
    <div className="w-full new-music">
      <div className="w-full relative overflow-hidden text-text-2 max-w-[calc(100vw_-_40px)] lg:max-w-[calc(100vw_-_290px)] mt-2">
        {newMusics.length ? (
          <NewMusicList musics={newMusics} />
        ) : (
          <NewMusicSkeletonList />
        )}
      </div>
    </div>
  );
};
export default NewMusic;
