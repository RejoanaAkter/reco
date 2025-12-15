


export const CategoryCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-3 animate-pulse">
      <div className="w-16 h-16 rounded-full bg-gray-200 mb-2" />
      <div className="h-3 w-16 bg-gray-200 rounded mb-1" />
      <div className="h-2 w-10 bg-gray-200 rounded" />
    </div>
  );
};


export const LatestRecipesSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-3 border border-gray-200 rounded-lg p-3"
        >
          <div className="w-16 h-16 bg-gray-200 rounded-md" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="h-2 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

