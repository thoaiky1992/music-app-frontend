import { SOCKET_LIKE_CREATED, SOCKET_LIKE_DELETED } from "@/constants";
import useSocketIOContext from "@/context/socket-io.context";
import { MusicEntity } from "@/entities/music.entity";
import { MusicSerice } from "@/services/music.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GenreDetailList from "./GenreDetailList";
import GenreDetailSkeleton from "./GenreDetailSkeleton";

const GenreDetailPage = () => {
  const [songs, setSongs] = useState<Array<MusicEntity>>([]);
  const params = useParams();
  const { socket } = useSocketIOContext();

  useEffect(() => {
    (async () => {
      const musicService = MusicSerice.getInstance();
      const data = await musicService.getMysicById(String(params.id));
      setSongs(data.rows);
    })();
  }, []);

  useEffect(() => {
    // socket listen event liked
    socket.on(SOCKET_LIKE_CREATED, (doc) => {
      setSongs((prevList) =>
        prevList.map((song) => {
          if (song._id === doc.song) {
            song.likes++;
            return song;
          }
          return song;
        })
      );
    });

    // socket listen event unliked
    socket.on(SOCKET_LIKE_DELETED, (doc) => {
      setSongs((prevList) =>
        prevList.map((song) => {
          if (song._id === doc.song) {
            song.likes--;
            return song;
          }
          return song;
        })
      );
    });
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
