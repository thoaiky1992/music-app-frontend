import Logo from "@/assets/logo.webp";
import {
  ClipboardListIcon,
  HeartIcon,
  HomeIcon,
  MusicNoteIcon,
} from "@heroicons/react/outline";

const DrawerDesktop = () => {
  return (
    <div className="fixed lg:relative lg:flex flex-col w-[250px] bg-primary lg:bg-transparent h-screen shadow-lg shadow-text-1 z-50 text-text-2">
      <div className="w-full flex justify-center my-10">
        <img src={Logo} className="h-[60px] w-[100%] px-10 object-contain" />
      </div>
      <div className="w-full flex justify-center">
        <div className="border-b-[1px] border-text-1 w-[80%]"></div>
      </div>
      <div className="w-full mx-5 my-10 lg:m-10 flex-1 flex flex-col">
        <div className="flex items-center text-high-light">
          <HomeIcon className="w-5 h-5 mr-5" />
          <span className="mt-1">Home</span>
        </div>
        <div className="flex items-center mt-10">
          <MusicNoteIcon className="w-5 h-5 mr-5" />
          <span>Music</span>
        </div>
        <div className="flex items-center mt-10">
          <ClipboardListIcon className="w-5 h-5 mr-5" />
          <span className="mt-[1px]">Playlist</span>
        </div>
        <div className="flex items-center mt-10">
          <HeartIcon className="w-5 h-5 mr-5" />
          <span className="mt-[1px]">Favorite</span>
        </div>
      </div>
    </div>
  );
};
export default DrawerDesktop;
