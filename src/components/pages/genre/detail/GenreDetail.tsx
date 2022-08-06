import { ADD_SONG_TO_PLAY_LIST } from "@/constants";
import { MusicEntity } from "@/entities/music.entity";
import { MusicSerice } from "@/services/music.service";
import { useAppDispatch } from "@/store/configStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GenreDetailList from "./GenreDetailList";
import GenreDetailSkeleton from "./GenreDetailSkeleton";

const GenreDetailPage = () => {
  const [songs, setSongs] = useState<Array<MusicEntity>>([]);
  const params = useParams();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const handlePlayAlbum = async (id: string) => {};

  useEffect(() => {
    (async () => {
      const musicService = MusicSerice.getInstance();
      setLoading(true);
      const data = await musicService
        .findOptions({ where: { genre: params.id }, populate: "genre" })
        .getMany();
      setSongs(data.rows);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {songs.length ? (
        <GenreDetailList songs={songs} />
      ) : (
        <GenreDetailSkeleton />
      )}
    </>
  );
};
export default GenreDetailPage;
