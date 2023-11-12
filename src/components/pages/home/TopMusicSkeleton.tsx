const TopMusicSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <div
          key={item}
          className="top-music-1 w-full min-h-[60px] lg:min-h-[70px] flex flex-col mr-3 mb-3 bg-gradient-to-r from-app to-text-2 animate-pulse-opacity rounded-lg"
        ></div>
      ))}
    </>
  );
};
export default TopMusicSkeleton;
