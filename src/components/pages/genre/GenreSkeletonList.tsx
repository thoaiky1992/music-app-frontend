const GenreSkeletonList = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="pt-[70%] object-cover rounded-lg overflow-hidden bg-slate-500 lg:mr-5 mb-5 relative animate-pulse-opacity"
        >
          <figure className="absolute left-0 top-0 w-full h-full overflow-hidden bg-gradient-to-r from-app to-text-2 animate-pulse-opacity"></figure>
        </div>
      ))}
    </>
  );
};
export default GenreSkeletonList;
