const GenreDetailSkeleton = () => {
  return (
    <div className="w-full text-text-2">
      <div className="w-full flex items-center">
        <h1 className="text-xl lg:text-2xl min-w-[200px] min-h-[40px] rounded-lg bg-gradient-to-r from-app to-text-2 animate-pulse-opacity"></h1>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 3xl:grid-cols-4 mt-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <div
            key={item}
            className="pt-[30%] object-cover rounded-lg overflow-hidden bg-slate-500 lg:mr-5 mb-5 relative animate-pulse-opacity"
          >
            <figure className="absolute left-0 top-0 w-full h-full overflow-hidden bg-gradient-to-r from-app to-text-2 animate-pulse-opacity"></figure>
          </div>
        ))}
      </div>
      <div className="w-full pb-48 lg:pb-24"></div>
    </div>
  );
};
export default GenreDetailSkeleton;
