import getImageUrl from "@/settings/utils";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const RecipeCard = ({ item }) => {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative w-full h-48 rounded-t-lg overflow-hidden border-b-4 border-green-600">
        <Image
          src={getImageUrl(item.imageUrl)}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>

      {/* Title */}
      <h3 className="text-center text-lg font-semibold text-gray-900 py-3 px-4">
        {item.title}
      </h3>

      {/* Star Rating */}
   
    </div>
  );
};

export default RecipeCard;
