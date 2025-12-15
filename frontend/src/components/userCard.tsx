import getImageUrl from "@/settings/utils";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { BiDish } from "react-icons/bi";

interface Props {
  user: any;
  recipeCount: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

const UserCard = ({ user, recipeCount }: Props) => {
  return (
    <motion.div variants={cardVariants} className="group">
      <div className="bg-white rounded-lg p-6 shadow border border-amber-300 hover:shadow-md transition hover:border-amber-400">
        {/* Avatar */}
        <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-white shadow-md mb-4 group-hover:scale-105 transition">
          <img
            src={getImageUrl(user.image)}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="text-center space-y-2">
          <h3 className="font-medium text-gray-900 text-lg">{user.name}</h3>

          <div className="flex items-center justify-center gap-2 text-gray-700 text-sm">
            <FaEnvelope className="text-amber-600" size={14} />
            <span className="truncate">{user.email}</span>
          </div>

          {/* Recipe Count */}
          <div className="flex items-center justify-center">
            <BiDish className="w-4 h-4 text-amber-600" />
            <p className="text-xs text-gray-600">{recipeCount} recipes</p>
          </div>
        </div>

        {/* Hover line */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
