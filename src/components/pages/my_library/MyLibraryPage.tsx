import SongDetailItem from "@/components/shared/SongDetailItem";
import { SOCKET_MY_LIBRARY_REMOVE_THIS_SONG } from "@/constants";
import useSocketIOContext from "@/context/socket-io.context";
import { MusicEntity } from "@/entities/music.entity";
import { MusicSerice } from "@/services/music.service";
import { MyLibraryService } from "@/services/my-library.service";
import { RootState, useAppSelector } from "@/store/configStore";
import { useEffect, useState } from "react";

const MyLibraryPage = () => {
  const [songs, setSongs] = useState<Array<MusicEntity>>([]);
  const [isExist, setIsExist] = useState<boolean>(false);
  const userStore = useAppSelector((state: RootState) => state.user);
  const { socket } = useSocketIOContext();
  useEffect(() => {
    (async () => {
      const MmLibraryService = MyLibraryService.getInstance();
      const data = await MmLibraryService.findOptions({
        where: { user: userStore.user?._id },
        populate: "songs",
      }).getMany();
      setSongs(data.rows[0].songs as Array<MusicEntity>);
      setIsExist(
        (data.rows[0].songs as Array<MusicEntity>).length ? true : false
      );
    })();
  }, []);

  useEffect(() => {
    // socket listen event remove this song in to my lirary
    socket.on(SOCKET_MY_LIBRARY_REMOVE_THIS_SONG, (doc) => {
      setSongs((prevList) => {
        if (prevList.length === 1) setIsExist(false);
        return prevList.filter((song) => song._id !== doc.songId);
      });
    });
  }, []);

  return (
    <div className="w-full text-text-2">
      <div className="w-full flex items-center">
        <h1 className="text-xl lg:text-2xl">Thư viện</h1>
        <div className="flex-1 h-[4px] border-t-[1px] border-b-[1px] border-text-1 mx-5"></div>
      </div>
      {!isExist && (
        <div className="w-full mt-5">
          Không tồn tại bài hát nào trong thư viện ...
        </div>
      )}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 3xl:grid-cols-4 mt-5">
        {isExist &&
          songs.map((song) => (
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
export default MyLibraryPage;
