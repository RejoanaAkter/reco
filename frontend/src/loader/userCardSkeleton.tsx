const UserCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow border border-gray-200 animate-pulse">
      {/* Avatar */}
      <div className="w-28 h-28 mx-auto rounded-full bg-gray-200 mb-4" />

      {/* Name */}
      <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-3" />

      {/* Email */}
      <div className="h-3 w-40 bg-gray-200 rounded mx-auto mb-2" />

      {/* Recipe Count */}
      <div className="h-3 w-24 bg-gray-200 rounded mx-auto" />
    </div>
  );
};

export default UserCardSkeleton;
