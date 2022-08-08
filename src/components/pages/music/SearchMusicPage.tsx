import SongDetailItem from "@/components/shared/SongDetailItem";
import { MusicEntity } from "@/entities/music.entity";
import { MusicSerice } from "@/services/music.service";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchMusicPage = () => {
  const [songs, setSongs] = useState<Array<MusicEntity>>([]);
  const [isNotExist, setIsNotExist] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const keySearch = searchParams.get("keySearch");

  /**
   * get songs by key search
   */
  useEffect(() => {
    (async () => {
      const musicService = MusicSerice.getInstance();
      const data = await musicService
        .findOptions({ where: { $text: { $search: keySearch } } })
        .getMany();
      if (data.rows.length) {
        setIsNotExist(false);
        setSongs(data.rows);
      } else {
        setSongs([]);
        setIsNotExist(true);
      }
    })();
  }, [searchParams.get("keySearch")]);

  return (
    <div className="w-full text-text-2">
      <div className="w-full flex items-center">
        <h1 className="text-sm lg:text-2xl">Từ khoá "{keySearch}"</h1>
      </div>
      {isNotExist && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 3xl:grid-cols-4 mt-5 text-sm lg:text-2xl">
          Bài hát này không tồn tại ...
        </div>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 3xl:grid-cols-4 mt-5">
        {songs?.map((song) => (
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
export default SearchMusicPage;
