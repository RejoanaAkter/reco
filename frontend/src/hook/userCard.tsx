import Image from "next/image";
import { MdEmail, MdLocationPin } from "react-icons/md";
import getImageUrl from "@/settings/utils";

const UserCard = ({ user }) => {
  return (
    <div className="relative w-72 sm:w-64 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
      
      {/* Profile Image */}
      {user.image && (
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full ring-4 ring-white shadow-md overflow-hidden">
          <Image
            src={getImageUrl(user.image)}
            alt={user.name}
            width={112}
            height={112}
            className="object-cover w-full h-full rounded-full"
          />
        </div>
      )}

      {/* Card content */}
      <div className="pt-16 pb-6 px-5 text-center flex flex-col items-center">
        <h3 className="text-lg font-bold text-gray-800 hover:text-purple-500 transition">{user.name}</h3>

        <p className="flex items-center gap-2 text-sm text-purple-600 mt-1">
          <MdEmail /> {user.email}
        </p>

        <p className="flex items-center gap-2 text-sm text-green-500 mt-1">
          <MdLocationPin /> {user.address || "Unknown"}
        </p>

        {user.about && (
          <p className="mt-4 text-gray-700 text-sm leading-relaxed line-clamp-4">
            {user.about}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
