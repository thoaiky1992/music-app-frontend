import { MusicEntity } from "@/entities/music.entity";
import { useEffect, useState } from "react";
import { MusicSerice } from "@/services/music.service";
import { useNavigate, useParams } from "react-router";
import MusicDetailItem from "./MusicDetailItem";
import TopMusicList from "../home/TopMusicList";
import TopMusicSkeleton from "../home/TopMusicSkeleton";

const MusicDetailPage = () => {
  const [song, setSong] = useState<MusicEntity | null>(null);
  const [topMusics, setTopMusics] = useState<MusicEntity[]>([]);
  const musicService = MusicSerice.getInstance();

  const router = useParams();
  const navigate = useNavigate();

  const slug: string = router?.id || "";

  useEffect(() => {
    (async () => {
      const [topMusics, music] = await Promise.all([
        musicService.findOptions({ sort: [["views", -1]], skip: 0, limit: 5 }).getMany(),
        musicService.findOptions({ where: { slug }, sort: [["createdAt", -1]] }).getMany(),
      ]);

      setTopMusics(topMusics.rows);

      if (music.count > 0) setSong(music.rows[0]);
      else navigate("/");
    })();
  }, [slug]);

  return (
    <div className="w-full text-text-2">
      <div className="w-full flex items-center">
        <h1 className="text-xl lg:text-2xl">Bài hát</h1>
        <div className="flex-1 h-[4px] border-t-[1px] border-b-[1px] border-text-1 mx-5"></div>
      </div>

      <div className="w-full flex flex-col md:flex-row mt-5">
        <div className="flex lg:w-[450px] relative mt-2">{song && <MusicDetailItem song={song} />}</div>
        <div className="flex flex-col lg:flex-1 w-full mt-5 lg:mt-0">
          <div className="w-full grid grid-cols-1 lg:pl-5">
            {topMusics.length ? <TopMusicList isHiddenIconPlay={true} songs={topMusics} /> : <TopMusicSkeleton />}
          </div>
        </div>
      </div>
      <div className="w-full pb-48 lg:pb-24"></div>
    </div>
  );
};
export default MusicDetailPage;
