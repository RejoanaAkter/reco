"use client";

import AnimatedBorder from "@/components/animatedTitle";
import { useUsers } from "@/hook/userUsers";
import getImageUrl from "@/settings/utils";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { LuChefHat } from "react-icons/lu";

export default function UserList() {
  const { users, loading, error } = useUsers();

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6 }, // ✅ no ease
  },
};



  if (loading)
    return (
      <div className="py-16 flex items-center justify-center ">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Loading users...</p>
        </div>
      </div>
    );

  if (error)
    return <div className="py-16 text-center text-gray-600">{error}</div>;

  return (
    <section className="py-6 bg-white w-full">
      <div className="px-18">  <h2 className="text-xl font-semibold mb-1 text-gray-900 text-start font-serif italic flex gap-2">
        <LuChefHat size={24} className="text-amber-700" /> Our Contributors
      </h2>
      <AnimatedBorder /></div>
    
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {users.slice(0, 3).map((user) => (
            <motion.div
              key={user._id}
              variants={cardVariants}
              className="group"
            >
              {/* Simple Card */}
              <div className="bg-white rounded-lg p-6 shadow border border-amber-300 hover:shadow-md transition-all duration-300 hover:border-amber-400">
                {/* User Image */}
                <div className="relative mb-4">
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={getImageUrl(user.image)}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* User Information - Minimal */}
                <div className="text-center space-y-3">
                  {/* Name */}
                  <h3 className="font-medium text-gray-900 text-lg">
                    {user.name}
                  </h3>

                  {/* Email */}
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <FaEnvelope className="text-amber-500" size={14} />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>
                  {/* <div className="flex items-center justify-center gap-2 text-gray-600">
                    <FaEnvelope className="text-amber-500" size={14} />
                    <span className="text-sm truncate">{user.about}</span>
                  </div> */}
                </div>

                {/* Simple Hover Effect */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Simple View All Link */}
        {users.length > 6 && (
          <div className="text-center mt-8">
            <a
              href="/users"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors duration-300"
            >
              <span>View All Users</span>
              <span>→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
