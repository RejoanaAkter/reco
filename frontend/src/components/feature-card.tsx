import getImageUrl from "@/settings/utils";
import Image from "next/image";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const FeaturedRecipeCard = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(item.rating || 0);

  return (
    <div className="max-w-xs group relative rounded-2xl bg-white shadow-md overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
      {/* Image Section */}
      <div className="relative w-full h-52 overflow-hidden rounded-t-2xl">
        <Image
          src={getImageUrl(item.imageUrl)}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Featured Badge */}
        <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full text-black shadow">
          Featured
        </span>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 w-5 h-5" />
          ) : (
            <FaRegHeart className="text-gray-600 w-5 h-5" />
          )}
        </button>
      </div>

      {/* Title */}
      <h3 className="text-center text-sm font-semibold text-gray-700 px-4 py-4 tracking-wide group-hover:text-gray-700 transition-colors duration-300">
        {item.title}
      </h3>

      {/* Rating Section */}
      <div className="flex justify-center gap-1 pb-4">
           <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>⭐ {item.ratings?.length
                ? (item.ratings.reduce((a, b) => a + b.value, 0) / item.ratings.length).toFixed(1)
                : 0}</span>
              <span>❤️ {item.favorites?.length || 0}</span>
              <span>💬 {item.comments?.length || 0}</span>
            </div>
      </div>
    </div>
  );
};

export default FeaturedRecipeCard;
