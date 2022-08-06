import GenreSkeletonList from "./GenreSkeletonList";
import { GenreEntity } from "@/entities/genre.entity";
import { GenreService } from "@/services/genre.service";
import { useEffect, useState } from "react";
import GenreList from "./GenreList";
const GenrePage = () => {
  const [genres, setGenres] = useState<Array<GenreEntity>>([]);

  useEffect(() => {
    (async () => {
      const genreService = GenreService.getInstance();
      const data = await genreService.getMany();
      setGenres(data.rows);
    })();
  }, []);

  return (
    <div className="home w-full text-text-2">
      <div className="w-full flex items-center">
        <h1 className="text-xl lg:text-2xl">Thể loại</h1>
        <div className="flex-1 h-[4px] border-t-[1px] border-b-[1px] border-text-1 mx-5"></div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 py-5">
        {genres.length ? <GenreList genres={genres} /> : <GenreSkeletonList />}
      </div>
      <div className="w-full pb-48 lg:pb-24"></div>
    </div>
  );
};

export default GenrePage;
