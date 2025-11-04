import getImageUrl from "@/settings/utils";
import Image from "next/image";
import { MdRestaurantMenu } from "react-icons/md";
import { FaFireAlt } from "react-icons/fa";

const FeatureItemCard = ({ item, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(item._id)}
      className="group relative w-full max-w-[260px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          src={getImageUrl(item.imageUrl)}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-white text-xs font-semibold text-gray-700 px-2 py-0.5 rounded-full shadow-sm">
          {item?.cuisine || "Cuisine"}
        </div>
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
          <FaFireAlt className="text-xs" /> Hot
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3 flex flex-col gap-1 text-left">
        <h3 className="text-base font-semibold text-gray-800 leading-tight">
          {item.title}
        </h3>

        <div className="flex items-center text-sm text-gray-500">
          <MdRestaurantMenu className="mr-1 text-[#714A85]" />
          <span>{item?.category?.name || "Category"}</span>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mt-1">
          {item.description || "A delightful meal that blends taste with health and flavor."}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-red-500 font-semibold text-sm">
            ${item.price || "4.50"}
          </span>
          <button
            onClick={() => onSelect(item._id)}
            className="text-sm font-medium bg-lime-600 text-white px-3 py-1 rounded-full hover:bg-lime-700 transition"
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureItemCard;
