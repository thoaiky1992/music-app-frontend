import SongDetailItem from "@/components/shared/SongDetailItem";
import { MusicEntity } from "@/entities/music.entity";
import { MusicSerice } from "@/services/music.service";
import { useEffect, useState } from "react";

const MusicPage = () => {
  const [songs, setSongs] = useState<Array<MusicEntity>>([]);

  useEffect(() => {
    (async () => {
      const musicService = MusicSerice.getInstance();
      const data = await musicService.getMany();
      setSongs(data.rows);
    })();
  }, []);

  return (
    <div className="w-full text-text-2">
      <div className="w-full flex items-center">
        <h1 className="text-xl lg:text-2xl">Bài hát</h1>
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
export default MusicPage;
