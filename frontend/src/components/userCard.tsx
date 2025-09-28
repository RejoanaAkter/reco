import Image from "next/image";
import { MdEmail, MdLocationPin } from "react-icons/md";
import getImageUrl from "@/settings/utils";

const UserCard = ({ user }) => {
  return (
    <div className="relative bg-white/90 backdrop-blur-md rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-72 sm:w-64 pt-20 pb-6 px-5 flex flex-col items-center text-center mx-auto">
      {/* Profile Image */}
      {user.image && (
        <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-white border-4 border-white shadow-md overflow-hidden z-10">
          <Image
            src={getImageUrl(user.image)}
            alt={user.name}
            width={96}
            height={96}
            className="object-cover rounded-full"
          />
        </div>
      )}

      {/* User Info */}
      <h3 className="mt-4 text-lg font-semibold text-gray-800 hover:text-amber-600 transition">
        {user.name}
      </h3>

      <p className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-1">
        <MdEmail className="text-pink-500" /> {user.email}
      </p>

      <p className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-1">
        <MdLocationPin className="text-green-500" /> {user.address}
      </p>

      {user.about && (
        <p className="mt-4 text-gray-500 text-sm leading-relaxed line-clamp-4">
          {user.about}
        </p>
      )}
    </div>
  );
};

export default UserCard;
