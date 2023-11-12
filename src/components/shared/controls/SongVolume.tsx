import { ChangeEvent, FC, useState } from "react";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";

interface SongVolumeProps {
  handleChangeSongVolume: (percent: number) => void;
}
const SongVolume: FC<SongVolumeProps> = ({ handleChangeSongVolume }) => {
  const [volume, SetVolume] = useState<number>(100);

  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    SetVolume(Number(e.target.value));
    handleChangeSongVolume(Number(e.target.value));
  };

  return (
    <div className="w-full flex items-center pl-3">
      {volume === 0 ? (
        <BsFillVolumeMuteFill className="w-4 h-4 lg:w-6 lg:h-6 text-text-2 mr-2" />
      ) : (
        <BsFillVolumeUpFill className="w-4 h-4 lg:w-6 lg:h-6 text-text-2 mr-2" />
      )}
      <div className="slider">
        <input
          type="range"
          defaultValue={100}
          min={0}
          max={100}
          onInput={handleChangeVolume}
        />
        <progress max={100} value={volume} />
      </div>
    </div>
  );
};
export default SongVolume;
