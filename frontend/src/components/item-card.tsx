import getImageUrl from "@/settings/utils";
import Image from "next/image";
import { MdRestaurant } from "react-icons/md";

const colorClasses = [
  'bg-orange-200',
  'bg-sky-200',
  'bg-purple-100',
  'bg-pink-100',
  'bg-yellow-100',
  'bg-amber-100',
  'bg-indigo-100',
  'bg-teal-100',
];



const ItemCard = ({item}) => {
  debugger

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300  w-52 h-62">
      {/* Image */}
      {item.imageUrl && (
        <div className="w-full h-[100px] relative mb-4 overflow-hidden rounded-md">
          <Image
            src={getImageUrl(item.imageUrl)}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Title */}
      <div className="text-start text-sm px-2">
        <h3 className="font-semibold text-gray-700">{item.title}</h3>

        <div className="flex justify-between mt-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#ECE1F2] text-xs rounded">
            <MdRestaurant className="text-[#714A85]" />
            <span className="text-gray-700">{item?.category?.name}</span>
          </span>
          <p className="xs">{item?.prepTime} mins</p>
        </div>

        <div className="flex gap-1 text-xs rounded mt-2">
          {item?.tags?.map((tag: string, index: number) => (
            <p
              key={`${tag}-${index}`}
              className={` text-xs px-2  py-0.5 rounded text-gray-700 ${colorClasses[index % colorClasses.length]
                }`}
            >
              {tag}
            </p>
          ))}
        </div>


        <div className="inline-flex items-center px-2 bg-[#E5F5C9] text-xs rounded mt-2">
          <span className="text-gray-700">{item?.cuisine}</span>
        </div>

      </div>
    </div>
  );
};

export default ItemCard;
