import Image from "next/image";
import { MdEmail, MdLocationPin } from "react-icons/md";
import getImageUrl from "@/settings/utils";

const UserCard = ({ user }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-sm pt-20 pb-6 px-6 flex flex-col items-center text-center mx-auto">
      {/* Profile Image */}
      {user.image && (
        <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full bg-white border-4 border-white shadow-md overflow-hidden z-10">
          <Image
            src={getImageUrl(user.image)}
            alt={user.name}
            fill
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
        <p className="mt-4 text-gray-500 text-sm leading-relaxed">
          {user.about}
        </p>
      )}
    </div>
  );
};

export default UserCard;
